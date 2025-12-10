import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { LoginService } from 'app/services/login/login.service';
import { AuthService } from 'app/services/auth/auth.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
    
  deptVal:any;
  disable: boolean = false;
  fromdateofpo: string = "NA";
  todateofpo: string = "NA";
  mindate: any;
  maxdate: any;
  today = new Date(); 
  todateerror: boolean = false;
  fromdateerror: boolean = false;
  statusTemplate1: boolean = true;
  emailid: string;
  forinternal: any;
  username: any;
  isenduser: boolean;
  isbuyer: boolean;
  innerbuyerportal: boolean;
  vendorPortal: boolean;
  ispayee: boolean;
  internalbcclportal: boolean = false;
  functionaldirector: boolean = false;
  innerportal: boolean;
  chartStatusList: { id: string; status: string; value: string; }[];
  toggleStatus:boolean = false;
  togglehideStatus:boolean = false;
  color = 'accent';

  public searchList = new FormGroup({
    monthDate: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    modeType: new FormControl(''),
    selected: new FormControl({ startDate: moment.isMoment, endDate: moment.isMoment }),
    modeFilterType: new FormControl(""),
    valueSelect: new FormControl(""),
  })
  
  fromtodatepresent: boolean;
  durationfromdate: string;
  durationtodate: string;
  fromdateofduration: string = "NA";
  todateofduration: string = "NA";
  mintodate: Date;
  modelist:any=[];
  modeVals:any=[];
  canvas:any;
  ctx:any;
  ageing_canvas:any;
  ageing_ctx:any;
  chartVals:any = [];
  valSum:number = 0;
  valAmt:string = '';
  ageing_chartVals:any = [];
  ageing_clicked:string;
  ageing_chart:boolean = false;
  events: string[] = [];
  myPieChart:Chart;
  myAgeingChart:Chart;
  math = Math;
  end_user_count_sum: number = 0;
  end_user_percent_sum: number = 0;
  payment_process_count_sum: number = 0;
  payment_process_percent_sum: number = 0;
  bigFiveChVals:any = [];

  constructor(private loaderservice: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService) { 
      this.chartStatusList = [
        { id: 'A', status: 'Accounting Pending', value: 'A' },
        { id: 'M', status: 'Invoice Approval', value: 'M' },
        { id: 'P', status: 'GRN Pending', value: 'P' },
        { id: 'PD', status: 'Invoice Fully Paid', value: 'PD' },
        { id: 'RO', status: 'Reopened For Correction', value: 'RO' },
        { id: 'V', status: 'Returned to Vendor', value: 'V' },
        { id: 'O', status: 'On Hold', value: 'O' },
        { id: 'PP', status: 'Invoice Partially Paid', value: 'PP' },
        { id: 'PRO', status: 'Invoice Processed', value: 'PRO' },
        { id: 'CM', status: 'GRN Confirmation', value: 'CM' },
        { id: 'INVROV', status: 'Rejected/Reopened', value: 'INVROV' }
      ]
    }


 async ngOnInit() {

  // ✅ Setup canvas safely
  // setTimeout(() => {
  //   this.canvas = document.getElementById('acquisitions');
  //   if (this.canvas) {
  //     this.ctx = this.canvas.getContext('2d');
  //   }
  // }, 0);

  this.maxdate = new Date();
  debugger;
  // ✅ Fetch username directly from session
  const userName = sessionStorage.getItem('username');

  if (!userName) {
    console.warn('Username not found in session');
    this.router.navigate(['/dashboardNoAccess']);
    return;
  }

  // ✅ BYPASS ALL PORTAL CHECKS & DIRECTLY EXECUTE REQUIRED LOGIC
  // ========================= FUNCTIONAL DIRECTOR BLOCK =========================
  // this.functionaldirector = true;
  // sessionStorage.setItem('portalAccessType', 'functional');

  // ✅ Get Dept
  this.deptVal = await this.getDeptDetailsbasedonemail(userName);
  debugger
  if (this.deptVal === 'ALL') {
    this.togglehideStatus = false;
  } else {
    this.togglehideStatus = true;
  }

  // ✅ Date Setup
  const from_date = new Date('2023-03-01');
  const today_date = new Date();
  const today_date_plus = new Date();
  today_date_plus.setDate(today_date_plus.getDate() + 1);

  const d1 = moment(from_date).format('DD-MM-YY').trim();
  const d2 = moment(today_date_plus).format('DD-MM-YY').trim();

  this.durationfromdate = d1;
  this.durationtodate = d2;

  this.searchList.controls['fromDate'].setValue(from_date);
  this.searchList.controls['toDate'].setValue(today_date);

  // ✅ FINAL CHART LOAD
  this.getChartData(this.deptVal, this.durationfromdate, this.durationtodate);

  // ✅ OPTIONAL AUTO SCROLL TO DROPDOWN
  setTimeout(() => {
    const element = document.getElementById('mat-select-0');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 2000);
}
ngAfterViewInit() {
  this.canvas = document.getElementById('acquisitions') as HTMLCanvasElement;

  if (!this.canvas) {
    console.error('Canvas not found');
    return;
  }

  this.ctx = this.canvas.getContext('2d');
}



  showBigFiveChart(){
      if(this.toggleStatus == true) {
        this.showBigFiveChartData();
        this.searchList.controls['fromDate'].disable();
        this.searchList.controls['toDate'].disable();
      }else {
        if (this.searchList.controls['fromDate'].value && this.searchList.controls['toDate'].value) {
          this.fromtodatepresent = true;
          this.fromdateofduration = moment(new Date(this.searchList.controls['fromDate'].value)).format("DD-MM-YY").trim();
          let to_date = new Date(this.searchList.controls['toDate'].value);
          let to_date_plus = to_date.setDate(to_date.getDate() + 1);
          this.todateofduration = moment(to_date_plus).format("DD-MM-YY").trim();
        }else {
          if(!this.durationfromdate && !this.durationtodate) {
            this.fromdateofduration = 'NA';
            this.todateofduration = 'NA';
          }else {
            this.fromdateofduration = this.durationfromdate;
            this.todateofduration = this.durationtodate;
          }
         
        }
        this.getChartData(this.deptVal,this.fromdateofduration,this.todateofduration);
        this.searchList.controls['fromDate'].enable();
        this.searchList.controls['toDate'].enable();
      }
  }

  showBigFiveChartData() {
    this.loginService.getBigFiveResponse().subscribe(res => {
      if (res.body.length > 0 && res.body[0].data && res.body[0].data.length > 0) {
          let showLegend = true;
          let obj = res.body;

          let chkeys = [];
          let chtableVals = [];
          let chVals = [];

          obj[0].data.map(item => {
            chtableVals = item;
          })

          let allChStatus = [];
          let allChTableStatus = [];

          let chartbgcolors = [];
          chartbgcolors.push('rgb(153, 1, 0)');
          chartbgcolors.push('rgb(204, 0, 1)');
          chartbgcolors.push('rgb(254, 0, 0)');
          chartbgcolors.push('rgb(232, 99, 87)');
          chartbgcolors.push('rgb(221, 158, 123)');
          chartbgcolors.push('rgb(239, 239, 239)');
          
          var i = 0;
          for (var prop in chtableVals) {
            chkeys.push(prop);
            let index = prop;
            if(prop == index) {
              let s = 0;
              let amt = 0;
              let percent = 0;
              let g21_l45 = 0;
              let g45_l90 = 0;
              let g90 = 0;
              for (var val in chtableVals[prop]) {
                
                for (var key_val in chtableVals[prop][val]) {
                  if(key_val == "COUNT") {
                    s += Number(chtableVals[prop][val]["COUNT"]);
                    amt += Number(chtableVals[prop][val]["AMOUNTInCR"]);
                    percent = Number(chtableVals[prop][val]["PERCENTAGE"]);
                    g21_l45 = Number(chtableVals[prop][val]["G21L45"]);
                    g45_l90 = Number(chtableVals[prop][val]["G45L90"]);
                    g90 = Number(chtableVals[prop][val]["G90"]);
                    let new_arr = [];
                    new_arr[prop] = val;
                    new_arr["G21L45"] = g21_l45;
                    new_arr["G45L90"] = g45_l90;
                    new_arr["G90"] = g90;
                    new_arr["PERCENT"] = percent; 
                    allChStatus.push(new_arr);
                  } 
                  
                }
              }
              chVals.push(s);
              allChTableStatus.push({key:prop,count_val:s,amt_val:amt.toFixed(2), key_color:chartbgcolors[i], g21_l45:g21_l45.toFixed(2),g45_l90:g45_l90.toFixed(2),g90:g90.toFixed(2),percent }) 
            }
            i++;
          }
          console.log(allChStatus);
          //console.log(allChTableStatus);
          this.bigFiveChVals = allChTableStatus;
          

          const bgcolor_plugin = {
            afterDraw: function(chart) {
              if (chart.data.datasets[0].data.every(item => item == 0)) {
                  let ctx = chart.chart.ctx;
                  let width = chart.chart.width;
                  let height = chart.chart.height;
  
                  chart.clear();
                  ctx.save();
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText('No data to display', width/2, height/2);
                  ctx.restore();
              }else if(chart.data.datasets[0].data.map(item => item == 0)) {
                let ctx = chart.chart.ctx;
              }
            }
          };

          const legend_plugin = {
            id: "increase-legend-spacing", 
            beforeInit(chart: any) {
              const originalFit = chart.legend.fit;
              chart.legend.fit = function fit() {
                originalFit.bind(chart.legend)();
                this.height += 30;
              }
            },
          };

         
          
          if(this.canvas instanceof HTMLCanvasElement) {
            // this.canvas.height = 500;
            
            let ageing_data = {
              labels: chkeys,
              datasets: [{
                data: chVals,
                backgroundColor: chartbgcolors,
                borderWidth: 1,
              }]
            };

            let config = {
              type: 'doughnut',
              plugins:[legend_plugin,bgcolor_plugin],
              
                data: {
                   labels: ageing_data.labels,
                   datasets: [{
                      data: ageing_data.datasets[0].data,
                      backgroundColor: ageing_data.datasets[0].backgroundColor,
                      hoverOffset: 4,
                      titleColor:"#fff",
                   }],
                },
                options: {
                  responsive:true,
                  maintainAspectRatio:false,
                  plugins: {
                    title: {
                        display: false,
                    },
                  },
                  legend: {
                    display:showLegend,
                    position: 'top' as const,
                    align: "center" as const,       
                    labels: {
                      fontColor: '#007bff',
                      boxWidth: 15,             
                    },
                  },
                  animation:{
                    onComplete: function(animation) {
                      document.getElementById('acquisitions-loader').style.display = 'none';
                    }
                  },
                  tooltips: {
                    enabled: false,
                    //position:'nearest',
                    custom: function(tooltipModel) {
                      let prop_pending_1 = "";
                      let prop_pending_2 = "";
                      let prop_pending_3 = "";
                      let prop_pending_percent = "";

                      let prop_confirmation_1 = "";
                      let prop_confirmation_2 = "";
                      let prop_confirmation_3 = "";
                      let prop_confirmation_percent = "";

                      let prop_approval_1 = "";
                      let prop_approval_2 = "";
                      let prop_approval_3 = "";
                      let prop_approval_percent = "";
                      if(tooltipModel.hasOwnProperty('dataPoints')) {
                        var dsname = allChTableStatus[tooltipModel.dataPoints[0].index].key;
                        var dscount = allChTableStatus[tooltipModel.dataPoints[0].index].count_val;
                        var dsbackgroundColor = ageing_data.datasets[0].backgroundColor[tooltipModel.dataPoints[0].index];
                        
                        allChStatus.map((k,v) => {
                          if(k[dsname] !== undefined) {
                            if(allChStatus[v][dsname] == "P") {
                              prop_pending_1 = allChStatus[v]["G21L45"];
                              prop_pending_2 = allChStatus[v]["G45L90"];
                              prop_pending_3 = allChStatus[v]["G90"];
                              prop_pending_percent = allChStatus[v]["PERCENT"];
                            }

                            if(allChStatus[v][dsname] == "CM") {
                              prop_confirmation_1 = allChStatus[v]["G21L45"];
                              prop_confirmation_2 = allChStatus[v]["G45L90"];
                              prop_confirmation_3 = allChStatus[v]["G90"];
                              prop_confirmation_percent = allChStatus[v]["PERCENT"];
                            }

                            if(allChStatus[v][dsname] == "M") {
                              prop_approval_1 = allChStatus[v]["G21L45"];
                              prop_approval_2 = allChStatus[v]["G45L90"];
                              prop_approval_3 = allChStatus[v]["G90"];
                              prop_approval_percent = allChStatus[v]["PERCENT"];
                            }
                          }
                        })
                      }

                      let tooltip = document.getElementById("chartjs-tooltip");

                      // Create element on first render
                      if (!tooltip){
                      tooltip = document.createElement('div');
                      tooltip.id = 'chartjs-tooltip';
                      tooltip.innerHTML = '<table></table>';
                      document.body.appendChild(tooltip);
                      }

                      // Hide if no tooltip
                      if (tooltipModel.opacity === 0) {
                        tooltip.style.opacity = "0";
                        return;
                      }
              
                      // show the tooltip.
                      tooltip.style.opacity = "1";
              
                      var tbl = document.createElement("table");
                      var tblBody = document.createElement("tbody");
                      
                      var row1 = document.createElement("tr");
                      var r1c1 = document.createElement("td");
                      var r1c1_text = document.createTextNode("");
                      r1c1.style.border = "0";
                      r1c1.style.backgroundColor = dsbackgroundColor;
                      r1c1.style.padding = "5px";
                      r1c1.colSpan = 1;
                      r1c1.appendChild(r1c1_text);
                      var r1c2 = document.createElement("td");
                      var r1c2_text = document.createTextNode(dsname+": COUNT - "+dscount);
                      r1c2.style.border = "0";
                      r1c2.style.padding = "5px";
                      r1c2.colSpan = 4;
                      r1c2.appendChild(r1c2_text);
                      row1.style.borderBottom = "1px solid #eeeeee";
                      row1.style.borderColor = "#eeeeee";
                      row1.appendChild(r1c1);
                      row1.appendChild(r1c2);

                      var row2 = document.createElement("tr");
                      var r2c1 = document.createElement("td");
                      var r2c1_text = document.createTextNode("Status");
                      r2c1.style.border = "0";
                      r2c1.style.width = "20%";
                      r2c1.style.padding = "5px";
                      r2c1.appendChild(r2c1_text);
                      var r2c2 = document.createElement("td");
                      var r2c2_text = document.createTextNode("21-45 days");
                      r2c2.style.border = "0";
                      r2c2.style.width = "20%";
                      r2c2.style.padding = "5px";
                      r2c2.appendChild(r2c2_text);
                      var r2c3 = document.createElement("td");
                      var r2c3_text = document.createTextNode("45-90 days");
                      r2c3.style.border = "0";
                      r2c3.style.width = "20%";
                      r2c3.style.padding = "5px";
                      r2c3.appendChild(r2c3_text);
                      var r2c4 = document.createElement("td");
                      var r2c4_text = document.createTextNode("> 90 days");
                      r2c4.style.border = "0";
                      r2c4.style.width = "20%";
                      r2c4.style.padding = "5px";
                      r2c4.appendChild(r2c4_text);
                      var r2c5 = document.createElement("td");
                      var r2c5_text = document.createTextNode("%");
                      r2c5.style.border = "0";
                      r2c5.style.width = "20%";
                      r2c5.style.padding = "5px";
                      r2c5.appendChild(r2c5_text);
                      row2.style.borderBottom = "1px solid #eeeeee";
                      row2.style.borderColor = "#eeeeee";
                      row2.style.fontWeight = "700";
                      row2.appendChild(r2c1);
                      row2.appendChild(r2c2);
                      row2.appendChild(r2c3);
                      row2.appendChild(r2c4);
                      row2.appendChild(r2c5);

                      var row3 = document.createElement("tr");
                      var r3c1 = document.createElement("td");
                      var r3c1_text = document.createTextNode("GRN Pending");
                      r3c1.style.border = "0";
                      r3c1.style.width = "20%";
                      r3c1.style.padding = "5px";
                      r3c1.appendChild(r3c1_text);
                      var r3c2 = document.createElement("td");
                      var r3c2_text = document.createTextNode(prop_pending_1);
                      r3c2.style.border = "0";
                      r3c2.style.width = "20%";
                      r3c2.style.padding = "5px";
                      r3c2.appendChild(r3c2_text);
                      var r3c3 = document.createElement("td");
                      var r3c3_text = document.createTextNode(prop_pending_2);
                      r3c3.style.border = "0";
                      r3c3.style.width = "20%";
                      r3c3.style.padding = "5px";
                      r3c3.appendChild(r3c3_text);
                      var r3c4 = document.createElement("td");
                      var r3c4_text = document.createTextNode(prop_pending_3);
                      r3c4.style.border = "0";
                      r3c4.style.width = "20%";
                      r3c4.style.padding = "5px";
                      r3c4.appendChild(r3c4_text);
                      var r3c5 = document.createElement("td");
                      var r3c5_text = document.createTextNode(prop_pending_percent);
                      r3c5.style.border = "0";
                      r3c5.style.width = "20%";
                      r3c5.style.padding = "5px";
                      r3c5.appendChild(r3c5_text);
                      row3.style.borderBottom = "1px solid #eeeeee";
                      row3.style.borderColor = "#eeeeee";
                      row3.appendChild(r3c1);
                      row3.appendChild(r3c2);
                      row3.appendChild(r3c3);
                      row3.appendChild(r3c4);
                      row3.appendChild(r3c5);

                      var row4 = document.createElement("tr");
                      var r4c1 = document.createElement("td");
                      var r4c1_text = document.createTextNode("GRN Confirmation");
                      r4c1.style.border = "0";
                      r4c1.style.width = "20%";
                      r4c1.style.padding = "5px";
                      r4c1.appendChild(r4c1_text);
                      var r4c2 = document.createElement("td");
                      var r4c2_text = document.createTextNode(prop_confirmation_1);
                      r4c2.style.border = "0";
                      r4c2.style.width = "20%";
                      r4c2.style.padding = "5px";
                      r4c2.appendChild(r4c2_text);
                      var r4c3 = document.createElement("td");
                      var r4c3_text = document.createTextNode(prop_confirmation_2);
                      r4c3.style.border = "0";
                      r4c3.style.width = "20%";
                      r4c3.style.padding = "5px";
                      r4c3.appendChild(r4c3_text);
                      var r4c4 = document.createElement("td");
                      var r4c4_text = document.createTextNode(prop_confirmation_3);
                      r4c4.style.border = "0";
                      r4c4.style.width = "20%";
                      r4c4.style.padding = "5px";
                      r4c4.appendChild(r4c4_text);
                      var r4c5 = document.createElement("td");
                      var r4c5_text = document.createTextNode(prop_confirmation_percent);
                      r4c5.style.border = "0";
                      r4c5.style.width = "20%";
                      r4c5.style.padding = "5px";
                      r4c5.appendChild(r4c5_text);
                      row4.style.borderBottom = "1px solid #eeeeee";
                      row4.style.borderColor = "#eeeeee";
                      row4.appendChild(r4c1);
                      row4.appendChild(r4c2);
                      row4.appendChild(r4c3);
                      row4.appendChild(r4c4);
                      row4.appendChild(r4c5);

                      var row5 = document.createElement("tr");
                      var r5c1 = document.createElement("td");
                      var r5c1_text = document.createTextNode("Invoice Approval");
                      r5c1.style.border = "0";
                      r5c1.style.width = "20%";
                      r5c1.style.padding = "5px";
                      r5c1.appendChild(r5c1_text);
                      var r5c2 = document.createElement("td");
                      var r5c2_text = document.createTextNode(prop_approval_1);
                      r5c2.style.border = "0";
                      r5c2.style.width = "20%";
                      r5c2.style.padding = "5px";
                      r5c2.appendChild(r5c2_text);
                      var r5c3 = document.createElement("td");
                      var r5c3_text = document.createTextNode(prop_approval_2);
                      r5c3.style.border = "0";
                      r5c3.style.width = "20%";
                      r5c3.style.padding = "5px";
                      r5c3.appendChild(r5c3_text);
                      var r5c4 = document.createElement("td");
                      var r5c4_text = document.createTextNode(prop_approval_3);
                      r5c4.style.border = "0";
                      r5c4.style.width = "20%";
                      r5c4.style.padding = "5px";
                      r5c4.appendChild(r5c4_text);
                      var r5c5 = document.createElement("td");
                      var r5c5_text = document.createTextNode(prop_approval_percent);
                      r5c5.style.border = "0";
                      r5c5.style.width = "20%";
                      r5c5.style.padding = "5px";
                      r5c5.appendChild(r5c5_text);
                      row5.style.borderBottom = "1px solid #eeeeee";
                      row5.style.borderColor = "#eeeeee";
                      row5.appendChild(r5c1);
                      row5.appendChild(r5c2);
                      row5.appendChild(r5c3);
                      row5.appendChild(r5c4);
                      row5.appendChild(r5c5);

                      tblBody.appendChild(row1);
                      tblBody.appendChild(row2);
                      tblBody.appendChild(row3);
                      tblBody.appendChild(row4);
                      tblBody.appendChild(row5);
                      tbl.appendChild(tblBody);

                      let tableRoot = tooltip.querySelector('table');
                      tableRoot.innerHTML = "";
                      tableRoot.appendChild(tbl);

                      tbl.style.boxShadow = "0 0 3px 3px #eeeeee";
                      tbl.style.borderColor = "1px solid #eee";
                      tbl.style.backgroundColor = "#fff";
                      tbl.style.width = "450px";
                      tooltip.style.opacity = "1";
                      tooltip.style.position = 'absolute';
                      tooltip.style.left = "750px";
                      tooltip.style.top = "700px";
                      tooltip.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                      tooltip.style.pointerEvents = 'none';    
                    },
                  }
                }
             };

            if (this.myAgeingChart) {
              this.myAgeingChart.destroy();
            }
            // if (this.myPieChart) {
            //   this.myPieChart.destroy();
            // }
            this.destroyCharts();

            
            // this.myAgeingChart = new Chart(this.canvas, config);
            this.myAgeingChart = new Chart(this.ctx, config);
            this.myAgeingChart.update();
          }
      }else if(res.body.length > 0 && res.body[0].message.length > 0) {
        this.ageing_chartVals = [];
        if (this.myAgeingChart) {
          this.myAgeingChart.destroy();
        }
      }
    });
  }

  filterData() {
    let search = this.searchList.controls.modeFilterType.value;
    let evalue = search.toUpperCase();
    if(evalue != "")
    {
      let modellistCopy = this.modeVals;
      this.modelist = modellistCopy.filter(function(tag) 
      { 
        return tag.DESCRIPTION.indexOf(evalue) >= 0; 
      });
    }
    else{
      this.modelist = this.modeVals;
    }

  }


  navigatetointernalportal(emailId) {
    this.loaderservice.show();
    this.loginService.checkemailforinternalportal(emailId).subscribe(res => {
      if (res.body[0].status == "Success") {
        const accessKey = res.headers.get('Authorizationkey');
        const profileAccesKey = res.headers.get('Authorization');
        this.forinternal = emailId
        this.username = emailId
        if (accessKey != null || accessKey != undefined && profileAccesKey != null || profileAccesKey != undefined) {
          sessionStorage.setItem('ACCESS_TOKEN', accessKey);
          sessionStorage.setItem('PROFILE_ACCESS', profileAccesKey);
          sessionStorage.setItem('username', this.username);
          this.authService.login()
          this.getPortalTypebasedonemail(this.username);
        }
      }

    });

  }

 getDeptDetailsbasedonemail(userName) {
  debugger
    return new Promise((resolve) => {
      setTimeout(() => {
          this.loginService.getDeptDetails(userName).subscribe(res => {
          if (res.body[0].deptdetails && res.body[0].deptdetails.length > 0) {
              this.modelist = res.body[0].deptdetails;
              this.modeVals = this.modelist;
              this.deptVal = this.modelist[0]['DEPTCODE'];
              this.searchList.controls.valueSelect.setValue(this.modelist[0]['DESCRIPTION']);
              if(this.deptVal == 'ALL') {
                this.togglehideStatus = false;
              }else {
                this.togglehideStatus = true;
              }
              resolve(this.deptVal);                
          }else {
            resolve('NoAccess');
          }
      });
      }, 1000);
    });
  }

  async getPortalTypebasedonemail(userName) {
    
    this.loginService.getportalType(userName).subscribe(async res => {

      if (res.body.length>0) {
       
          if(res.body[0].mode == 'buyer')
          {
              this.isbuyer=true;
              this.isenduser=true;
              sessionStorage.setItem("portaltype","innerbuyerportal");
              this.innerbuyerportal = true;
              this.vendorPortal=false;
              this.innerportal=false;
              this.ispayee=false;
              this.router.navigate(['/dashboardNoAccess'])
          }
          else if((res.body[0].mode == 'enduser') || (res.body[0].mode == 'internalbcclportal'))
          {
              if(res.body[0].mode == 'internalbcclportal'){
                  this.internalbcclportal=true;
                  sessionStorage.setItem("portaltype","internalbcclportal");
              }
              else{
                  this.internalbcclportal=false
                  sessionStorage.setItem("portaltype","innerportal");
              }
              this.isenduser=false;
              this.innerportal=true;
              this.vendorPortal=false;
              this.innerbuyerportal = false;
              this.ispayee=false;

              if(res.body[0].functionalDirector == 'PRESENT') {
                this.functionaldirector=true;
                sessionStorage.setItem('portalAccessType','functional');
                this.deptVal = await this.getDeptDetailsbasedonemail(userName);
                if(this.deptVal == 'ALL') {
                  this.togglehideStatus = false;
                }else {
                  this.togglehideStatus = true;
                }
                var from_date = new Date("2023-03-01");
                var today_date = new Date();
                var today_date_plus = new Date();
                today_date_plus.setDate(today_date_plus.getDate() + 1);
                var d1 = moment(from_date).format("DD-MM-YY").trim();
                var d2 = moment(today_date_plus).format("DD-MM-YY").trim();
                
                this.durationfromdate = d1;
                this.durationtodate = d2;
                this.searchList.controls['fromDate'].setValue(from_date);
                this.searchList.controls['toDate'].setValue(today_date);
                this.getChartData(this.deptVal,this.durationfromdate,this.durationtodate);
              }else {
                this.router.navigate(['/dashboardNoAccess'])
              }
          }
          else if(res.body[0].mode == 'payer')
          {
              sessionStorage.setItem("portaltype","payerportal");
              this.isenduser=false;
              this.innerportal=false;
              this.vendorPortal=false;
              this.ispayee=true;
        
              if(res.body[0].functionalDirector == 'PRESENT') {
                this.functionaldirector=true;
                sessionStorage.setItem('portalAccessType','functional');
              }
                this.deptVal = await this.getDeptDetailsbasedonemail(userName);
                var from_date = new Date("2023-03-01");
                var today_date = new Date();
                var today_date_plus = new Date();
                today_date_plus.setDate(today_date_plus.getDate() + 1);
                var d1 = moment(from_date).format("DD-MM-YY").trim();
                var d2 = moment(today_date_plus).format("DD-MM-YY").trim();
                
                this.durationfromdate = d1;
                this.durationtodate = d2;
                this.searchList.controls['fromDate'].setValue(from_date);
                this.searchList.controls['toDate'].setValue(today_date);
                this.getChartData(this.deptVal,this.durationfromdate,this.durationtodate);
              
          }      
      }
      });
    
  }
  
  getChartStatus(idVal) {
    for (var a = 0; a < this.chartStatusList.length; a++) {
      if (this.chartStatusList[a].id == idVal) {
        return this.chartStatusList[a].status;
      }
    }
  }

  getAgeingChartData(deptVal,fromDate,toDate,status) {
    if(deptVal == 'All') {
      this.togglehideStatus = false;
      if(this.toggleStatus == true) {
        this.searchList.controls['fromDate'].disable();
        this.searchList.controls['toDate'].disable();
      }else {
        this.searchList.controls['fromDate'].enable();
        this.searchList.controls['toDate'].enable();
      }
    }else {
      this.toggleStatus = false;
      this.togglehideStatus = true;
      this.searchList.controls['fromDate'].enable();
      this.searchList.controls['toDate'].enable();
    }
    
    this.ageing_chart = true;
    this.loginService.getInvoiceAgeingResponse(deptVal,fromDate,toDate,status).subscribe(res => {
      if (res.body.length > 0 && res.body[0].invoiceAgeingList && res.body[0].invoiceAgeingList.length > 0) {

          let dataVals = [];
          let chartValues;
          let showLegend = true;

          let chartbgcolors = [];
          if(this.ageing_clicked == 'INVROV' || this.ageing_clicked == 'PRO' || this.ageing_clicked == 'PP' || this.ageing_clicked == 'PD') {
            chartbgcolors.push('rgb(149, 173, 189)');
            chartbgcolors.push('rgb(155, 181, 190)');
            chartbgcolors.push('rgb(165, 185, 201)');
            chartbgcolors.push('rgb(190, 215, 227)');
            showLegend = false;
          }else {
            chartbgcolors.push('rgb(60, 184, 0)');
            chartbgcolors.push('rgb(154, 205, 104)');
            chartbgcolors.push('rgb(255, 204, 51)');
            chartbgcolors.push('rgb(224, 25, 6)');
          }

          res.body[0].invoiceAgeingList.map(row => {
            var entry = row;
            var c = 0;
            for (var a in entry){
              if(a == this.ageing_clicked) {
                dataVals.push({'chartVal': {'key':a,'chartFor':'Invoices less than 7 days','Invoices less than 7 days':entry[a]['Invoices less than 7 days'],'Percentage of Invoices less than 7 days':entry[a]['Percentage of Invoices less than 7 days'],'Invoices less than 7 days_dataColor':chartbgcolors[0]}});
                dataVals.push({'chartVal': {'key':a,'chartFor':'Invoices between 7 to 14 days','Invoices between 7 to 14 days':entry[a]['Invoices between 7 to 14 days'],'Percentage of Invoices between 7 to 14 days':entry[a]['Percentage of Invoices between 7 to 14 days'],'Invoices between 7 to 14 days_dataColor':chartbgcolors[1]}});
                dataVals.push({'chartVal': {'key':a,'chartFor':'Invoices between 14 to 21 days','Invoices between 14 to 21 days':entry[a]['Invoices between 14 to 21 days'],'Percentage of Invoices between 14 to 21 days':entry[a]['Percentage of Invoices between 14 to 21 days'],'Invoices between 14 to 21 days_dataColor':chartbgcolors[2]}});
                dataVals.push({'chartVal': {'key':a,'chartFor':'Invoices greater than 21 days','Invoices greater than 21 days':entry[a]['Invoices greater than 21 days'],'Percentage of Invoices greater than 21 days':entry[a]['Percentage of Invoices greater than 21 days'],'Invoices greater than 21 days_dataColor':chartbgcolors[3]}});
              }
              c++;
            }
          })

          chartValues = dataVals;

          let chtableVals = [];
          chartValues.map(val=> {
            if(val.chartVal.key == this.ageing_clicked && val.chartVal.chartFor == 'Invoices less than 7 days' && val.chartVal['Invoices less than 7 days'] >= 0) {
              chtableVals.push({'chartValue':val.chartVal['Invoices less than 7 days'],'percent':Number(val.chartVal['Percentage of Invoices less than 7 days']).toFixed(2),'dataColor':val.chartVal['Invoices less than 7 days_dataColor'],'chartTxt':'0-7 days'});
            }
            if(val.chartVal.key == this.ageing_clicked && val.chartVal.chartFor == 'Invoices between 7 to 14 days' && val.chartVal['Invoices between 7 to 14 days'] >= 0) {
              chtableVals.push({'chartValue':val.chartVal['Invoices between 7 to 14 days'],'percent':Number(val.chartVal['Percentage of Invoices between 7 to 14 days']).toFixed(2),'dataColor':val.chartVal['Invoices between 7 to 14 days_dataColor'],'chartTxt':'7-14 days'});
            }
            if(val.chartVal.key == this.ageing_clicked && val.chartVal.chartFor == 'Invoices between 14 to 21 days' && val.chartVal['Invoices between 14 to 21 days'] >= 0) {
              chtableVals.push({'chartValue':val.chartVal['Invoices between 14 to 21 days'],'percent':Number(val.chartVal['Percentage of Invoices between 14 to 21 days']).toFixed(2),'dataColor':val.chartVal['Invoices between 14 to 21 days_dataColor'],'chartTxt':'14-21 days'});
            }
            if(val.chartVal.key == this.ageing_clicked && val.chartVal.chartFor == 'Invoices greater than 21 days' && val.chartVal['Invoices greater than 21 days'] >= 0) {
              chtableVals.push({'chartValue':val.chartVal['Invoices greater than 21 days'],'percent':Number(val.chartVal['Percentage of Invoices greater than 21 days']).toFixed(2),'dataColor':val.chartVal['Invoices greater than 21 days_dataColor'],'chartTxt':'> 21 days'});
            }
          });

          let chkeys = [];
          chtableVals.map(values=> {
            chkeys.push(values.chartTxt);
          });
          
          this.ageing_chartVals = [];
          this.ageing_chartVals = chtableVals;
          let clicked_val = this.ageing_clicked;
          const bgcolor_plugin = {
            afterDraw: function(chart) {
              if (chart.data.datasets[0].data.every(item => item == 0)) {
                  let ctx = chart.chart.ctx;
                  let width = chart.chart.width;
                  let height = chart.chart.height;
  
                  chart.clear();
                  ctx.save();
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText('No data to display', width/2, height/2);
                  ctx.restore();
              }else if(chart.data.datasets[0].data.map(item => item == 0)) {
                let ctx = chart.chart.ctx;
                ctx.fillStyle = "#000";
                //console.log(clicked_val);
                if(clicked_val == 'INVROV' || clicked_val == 'PRO' || clicked_val == 'PP' || clicked_val == 'PD') {
                  ctx.font = "10px Roboto";
                  ctx.fillText('SLAs do not apply to this chart hence colours are muted.', 140, 12);
                }
              }
            }
          };

          const legend_plugin = {

            id: "increase-legend-spacing", 
            beforeInit(chart: any) {
              const originalFit = chart.legend.fit;
              chart.legend.fit = function fit() {
                originalFit.bind(chart.legend)();
                this.height += 20;
              }
            }
          };

          if(this.canvas instanceof HTMLCanvasElement) {
            // this.canvas.height = 300;
            
            let ageing_data = {
              labels: chkeys,
              datasets: [{
                label: this.getChartStatus(this.ageing_clicked),
                data: chtableVals.map(row => {
                  return row.chartValue
                }),
                backgroundColor: chartbgcolors,
                borderWidth: 1
              }]
            };

            let config = {
              type: 'doughnut',
              plugins:[legend_plugin,bgcolor_plugin],
                data: {
                   labels: ageing_data.labels,
                   datasets: [{
                      label: ageing_data.datasets[0].label,
                      data: ageing_data.datasets[0].data,
                      backgroundColor: ageing_data.datasets[0].backgroundColor,
                      hoverOffset: 4
                   }]
                },
                options: {
                  responsive:true,
                  maintainAspectRatio:false,
                  legend: {
                    display:showLegend,
                    labels:{
                      fontColor: '#007bff',
                    }
                  },
                  plugins: {
                    title: {
                        display: true,
                        text: 'Ageing: ',
                    },
                  },
                  animation:{
                    onComplete: function(animation) {
                        document.getElementById('acquisitions-loader').style.display = 'none';
                    }
                  },
                  tooltips: {
                    callbacks: {
                        label: function(tooltipItem, chartData) {
                          let sum = 0;
                          let dataArr = ageing_data.datasets[0].data;
                          dataArr.map(data => {
                              sum = +sum + +data;
                          });
                          var dslabels = ageing_data.labels[tooltipItem.index];
                          var dataset = ageing_data.datasets[tooltipItem.datasetIndex];
                          var dslabelamt = dataset.data[tooltipItem.index];
                          var dslabelpercent = (dataset.data[tooltipItem.index]*100 / sum).toFixed(2);
                          return dslabels + ': ' + dslabelamt + ' (' + dslabelpercent + '%)';
                        },
                    }
                  }
                }
             };

            if (this.myAgeingChart) {
              this.myAgeingChart.destroy();
            }
            // if (this.myPieChart) {
            //   this.myPieChart.destroy();
            // }
            this.destroyCharts();

            
            this.myAgeingChart = new Chart(this.canvas, config);
            this.myAgeingChart.update();
          }
      }else if(res.body.length > 0 && res.body[0].message.length > 0) {
        this.ageing_chartVals = [];
        if (this.myAgeingChart) {
          this.myAgeingChart.destroy();
        }
      }
    });
  }

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  mixedSum = (arr = []) => {
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
       const el = arr[i];
       sum += +el;
    };
    return sum;
 };

  getChartData(deptVal,fromDate,toDate) {
    if(deptVal == 'All') {
      this.togglehideStatus = false;
      if(this.toggleStatus == true) {
        this.searchList.controls['fromDate'].disable();
        this.searchList.controls['toDate'].disable();
      }else {
        this.searchList.controls['fromDate'].enable();
        this.searchList.controls['toDate'].enable();
      }
    }else {
      this.toggleStatus = false;
      this.togglehideStatus = true;
      this.searchList.controls['fromDate'].enable();
      this.searchList.controls['toDate'].enable();
    }
    this.ageing_chart = false;
    this.loginService.getInvoiceSummeryFunctionWise(deptVal,fromDate,toDate).subscribe(res => {
      if (res.body.length > 0 && res.body[0].invoiceSummery && res.body[0].invoiceSummery.length == 1) {
          
          const dataVals = [];
          const dataVals_copy = [];
          var chartValues;
          this.end_user_count_sum = 0;
          this.end_user_percent_sum = 0;
          this.payment_process_count_sum = 0;
          this.payment_process_percent_sum = 0;

          let chartbgcolors = [];
          
          chartbgcolors.push('rgb(3, 86, 138)');
          chartbgcolors.push('rgb(27, 117, 177)');
          chartbgcolors.push('rgb(81, 161, 212)');
          chartbgcolors.push('rgb(153, 211, 249)');
          chartbgcolors.push('rgb(205, 236, 255)');
          chartbgcolors.push('rgb(153, 255, 204)');
          chartbgcolors.push('rgb(102, 255, 205)');
          chartbgcolors.push('rgb(0, 204, 204)');
          chartbgcolors.push('rgb(51, 153, 153)');

          res.body[0].invoiceSummery.map(row => {
            var entry = row;
            var c = 0;
            for (var a in entry){
              if(entry[a].COUNT == 0) {
                dataVals.push({'chartVal': {'key':a,'val':entry[a].COUNT,'percent':entry[a].PERCENTAGE,'amount':Number(entry[a].AMOUNTInCR).toFixed(2),'dataColor':chartbgcolors[c]}});
              }else {
                dataVals.push({'chartVal': {'key':a,'val':entry[a].COUNT,'percent':entry[a].PERCENTAGE,'amount':Number(entry[a].AMOUNTInCR).toFixed(2),'dataColor':chartbgcolors[c]}});
                dataVals_copy.push({'chartVal': {'key':a,'val':entry[a].COUNT,'percent':entry[a].PERCENTAGE,'amount':Number(entry[a].AMOUNTInCR).toFixed(2),'dataColor':chartbgcolors[c]}});
              }

              if(c > -1 && c < 4) {
                this.end_user_count_sum += Number(entry[a].COUNT);
              }
              
              if(c > 3 && c < 8) {
                this.payment_process_count_sum += Number(entry[a].COUNT);
              }
              c++;
            }
          })
          chartValues = dataVals;
          this.chartVals = chartValues;
          chartValues = dataVals_copy;
          let chvals = [];
          let valsSum = 0;
          let valsAmt = 0;
          chartValues.map((values)=> {
            valsSum += Number(values.chartVal.val);
            valsAmt += Number(values.chartVal.amount);
            chvals.push(values.chartVal.val);
          });
          this.valSum = valsSum;

          let endPercentArr = [];
          let payPercentArr = [];
          chartValues.map((values,index)=> {
            if(index > -1 && index < 4) {
              endPercentArr.push(((values.chartVal.val/valsSum)*100).toFixed(2));
            }
            if(index > 3 && index < 8) {
              payPercentArr.push(((values.chartVal.val/valsSum)*100).toFixed(2));
            }
          });
          this.end_user_percent_sum = this.mixedSum(endPercentArr);
          this.payment_process_percent_sum = this.mixedSum(payPercentArr);
          this.valAmt = valsAmt.toFixed(2);

          let chkeys = [];
          chartValues.map(values=> {
            chkeys.push(this.getChartStatus(values.chartVal.key));
          });

          let chbgs = [];
          chartValues.map(values=> {
            chbgs.push(values.chartVal.dataColor);
          });

          const data = {
            labels: chkeys,
            datasets: [{
              backgroundColor: chbgs,
              data: chvals,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      fontColor: '#007bff',
                      boxWidth: 15,
                      font : {
                        size:15,
                      }
                    },
                  },
                  datalabels: {
                    color: '#36A2EB',
                   
                  },
                  hoverOffset: 4
                },
                
              },
              datalabels: {
                color: '#000000',
              },
            },
            ]
          };
          
          const bgcolor_plugin = {
            afterDraw: function(chart) {
              if (chart.data.datasets[0].data.every(item => item == 0)) {
                  let ctx = chart.chart.ctx;
                  let width = chart.chart.width;
                  let height = chart.chart.height;
  
                  chart.clear();
                  ctx.save();
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText('No data to display', width/2, height/2);
                  ctx.restore();
              }else if(chart.data.datasets[0].data.map(item => item == 0)) {
                let ctx = chart.chart.ctx;
              }
            }
          };

          const legend_plugin = {

            id: "increase-legend-spacing", 
            beforeInit(chart: any) {
              const originalFit = chart.legend.fit;
              chart.legend.fit = function fit() {
                originalFit.bind(chart.legend)();
                this.height += 20;
              }
            }
          };

          if(this.canvas instanceof HTMLCanvasElement) {
            // this.canvas.height = 340;

            let config = {
              type: 'pie',
                plugins: [legend_plugin,bgcolor_plugin],
                options:{
                  responsive:true,
                  maintainAspectRatio: false,
                  legend: {
                    position: 'top' as const,
                    align: "center" as const,       
                    labels: {
                      fontColor: '#646a67',
                      boxWidth: 15,
                      font : {
                        size:15,
                      }
                    },
                    
                  },
                  animation:{
                    onComplete: function(animation) {
                        if(this.valSum == 0){
                          document.getElementById('acquisitions').style.display = 'none';
                        }
                        document.getElementById('acquisitions-loader').style.display = 'none';
                    }
                  },
                  tooltips: {
                    callbacks: {
                        label: function(tooltipItem, chartData) {
                          let sum = 0;
                          let dataArr = data.datasets[0].data;
                          dataArr.map((data) => {
                              sum = +sum + +data;      
                          });
                          var dslabels = data.labels[tooltipItem.index];
                          var dataset = data.datasets[tooltipItem.datasetIndex];
                          var dslabelCount = Math.trunc(dataset.data[tooltipItem.index]);
                          var dslabelpercent = (dataset.data[tooltipItem.index]*100 / sum).toFixed(2);

                          return dslabels + ': ' + dslabelCount + ' (' + dslabelpercent + '%)';
                        },
                    }
                  }
                },
                data: {
                  labels: data.labels.map(row => row),
                  datasets: [
                    {
                      backgroundColor: data.datasets[0].backgroundColor,
                      data: data.datasets[0].data,
                    },
                    
                  ]
                },
            };

            // if (this.myPieChart) {
            //   this.myPieChart.destroy();
            // }
            this.destroyCharts();

            if(this.myAgeingChart) {
              this.myAgeingChart.destroy();
            }
            
            // this.myPieChart = new Chart(this.canvas, config);
            this.myPieChart = new Chart(this.ctx, config);
            this.myPieChart.update();
          }
      }else if(res.body.length > 0 && res.body[0].message.length > 0) {
        this.chartVals = [];
        // if (this.myPieChart) {
        //   this.myPieChart.destroy();
        // }
        this.destroyCharts();

      }
    });
  }

  
  // ***************************Tooltip 04/01/2023 Start***********************************
  
  onMouseEnter() {
    this.statusTemplate1 = true;
  }

  onClick() {
    this.statusTemplate1 = false; 
  }
destroyCharts() {
  if (this.myPieChart) {
    this.myPieChart.destroy();
    this.myPieChart = null;
  }

  if (this.myAgeingChart) {
    this.myAgeingChart.destroy();
    this.myAgeingChart = null;
  }
}


  // ***************************Tooltip 04/01/2023 End***********************************

  onDateChange() {
    if (this.searchList.controls['fromDate'].value) {
      if (this.searchList.controls['toDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.todateerror = true;
        this.fromdateerror = false;
        this.disable = true;
      }
      this.mintodate = new Date(this.searchList.controls['fromDate'].value);
    }
    else if (this.searchList.controls['toDate'].value) {
      if (this.searchList.controls['fromDate'].value) {
        this.disable = false;
        this.fromdateerror = false;
        this.todateerror = false;
      }
      else {
        this.fromdateerror = true;
        this.todateerror = false;
        this.disable = true;
      }
    }
    this.maxdate = new Date(this.searchList.controls['toDate'].value);
  }

  getKeyByValue = (arr,str) => {
    var obj = null;    
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].DESCRIPTION == str) {
            obj = arr[i].DEPTCODE;
            return obj;
        }
    }
  }  
 
  updateChartData(type: string, event) {
    document.getElementById('acquisitions-loader').style.display = 'block';
    if (this.searchList.controls['fromDate'].value && this.searchList.controls['toDate'].value) {
      this.fromtodatepresent = true;
      this.fromdateofduration = moment(new Date(this.searchList.controls['fromDate'].value)).format("DD-MM-YY").trim();
      let to_date = new Date(this.searchList.controls['toDate'].value);
      let to_date_plus = to_date.setDate(to_date.getDate() + 1);
      this.todateofduration = moment(to_date_plus).format("DD-MM-YY").trim();
    }else {
      if(!this.durationfromdate && !this.durationtodate) {
        this.fromdateofduration = 'NA';
        this.todateofduration = 'NA';
      }else {
        this.fromdateofduration = this.durationfromdate;
        this.todateofduration = this.durationtodate;
      }
     
    }
    
    if(type == 'input') {
        this.canvas = document.getElementById('acquisitions');
        this.ctx = this.canvas.getContext('2d');
        this.chartVals = [];
        this.getChartData(this.deptVal,this.fromdateofduration,this.todateofduration);
        this.ageing_clicked = ''; 
    }else if(type == 'select') {
        this.deptVal = this.getKeyByValue(this.modelist,this.searchList.value.valueSelect);
        this.canvas = document.getElementById('acquisitions');
        this.ctx = this.canvas.getContext('2d');
        this.chartVals = [];
        this.getChartData(this.deptVal,this.fromdateofduration,this.todateofduration);
        this.ageing_clicked = '';
        this.modelist = this.modeVals;
    }

    if(this.deptVal == 'All') {
      this.togglehideStatus = false;
      if(this.toggleStatus == true) {
        this.searchList.controls['fromDate'].disable();
        this.searchList.controls['toDate'].disable();
      }else {
        this.searchList.controls['fromDate'].enable();
        this.searchList.controls['toDate'].enable();
      }
    }else {
      this.toggleStatus = false;
      this.togglehideStatus = true;
      this.searchList.controls['fromDate'].enable();
      this.searchList.controls['toDate'].enable();
    }

  }



  updateAgeingChart(status_clicked) {
    
    document.getElementById('acquisitions-loader').style.display = 'block';
    this.ageing_clicked = status_clicked;
    if (this.searchList.controls['fromDate'].value && this.searchList.controls['toDate'].value) {
      this.fromtodatepresent = true;
      this.fromdateofduration = moment(new Date(this.searchList.controls['fromDate'].value)).format("DD-MM-YY").trim();
      let to_date = new Date(this.searchList.controls['toDate'].value);
      let to_date_plus = to_date.setDate(to_date.getDate() + 1);
      this.todateofduration = moment(to_date_plus).format("DD-MM-YY").trim();
    }else {
      if(!this.durationfromdate && !this.durationtodate) {
        this.fromdateofduration = 'NA';
        this.todateofduration = 'NA';
      }else {
        this.fromdateofduration = this.durationfromdate;
        this.todateofduration = this.durationtodate;
      }
     
    }


    if(this.durationfromdate && this.durationtodate) {
        if(typeof this.ageing_clicked == 'undefined') {
          this.ageing_clicked = 'PD';
        }else {
          this.ageing_clicked = status_clicked;
        }
        this.getAgeingChartData(this.deptVal,this.fromdateofduration,this.todateofduration,this.ageing_clicked);
    }else {
        if(typeof this.ageing_clicked == 'undefined') {
          this.ageing_clicked = 'PD';
        }else {
          this.ageing_clicked = status_clicked;
        }
        this.getAgeingChartData(this.deptVal,this.fromdateofduration,this.todateofduration,this.ageing_clicked);
    }

  }

  showPieChart(status_clicked) {
    document.getElementById('acquisitions-loader').style.display = 'block';
    this.ageing_clicked = status_clicked;
    if (this.searchList.controls['fromDate'].value && this.searchList.controls['toDate'].value) {
      this.fromtodatepresent = true;
      this.fromdateofduration = moment(new Date(this.searchList.controls['fromDate'].value)).format("DD-MM-YY").trim();
      let to_date = new Date(this.searchList.controls['toDate'].value);
      let to_date_plus = to_date.setDate(to_date.getDate() + 1);
      this.todateofduration = moment(to_date_plus).format("DD-MM-YY").trim();
    }else {
      if(!this.durationfromdate && !this.durationtodate) {
        this.fromdateofduration = 'NA';
        this.todateofduration = 'NA';
      }else {
        this.fromdateofduration = this.durationfromdate;
        this.todateofduration = this.durationtodate;
      }
     
    }
    if(this.durationfromdate && this.durationtodate) {
      this.getChartData(this.deptVal,this.fromdateofduration,this.todateofduration);
    }else {
      this.getChartData(this.deptVal,this.fromdateofduration,this.todateofduration);
    }
  }
}

