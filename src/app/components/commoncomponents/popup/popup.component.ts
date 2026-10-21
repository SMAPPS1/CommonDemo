import { Component, Inject, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'app/services/LoaderService/loader.service';
import { PurchaseOrderListService } from 'app/services/purchaseOrderList/purchaseorderlist.service';
import { ShareDataService } from 'app/services/ShareData/share-data.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup-new.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  mydata: any;
  @Output() datasharingFunction2 = new EventEmitter();
  @Output() shareData=new EventEmitter();
  dataGO: any;
  validate: boolean = false;
  btnDisabled: boolean;
  remarklength: number = 160;
  UploadDocument: any;
  cancelledCheque: any;
  viewUploadFile: any;
  SubmitData: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loaderService: LoaderService,
    public dialogRef: MatDialogRef<PopupComponent>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private purchaseOrderListService: PurchaseOrderListService,
    private sharedata: ShareDataService

  ) { }
 

  @ViewChild('messages') messagesTextarea: any;
  displayTextarea: boolean = false;

  ngOnInit(): void {
    debugger
    this.mydata = this.data.datakey;
    console.log("loder:", this.mydata);
    this.UploadDocument = this.fb.group({
      ChequeAtt: [,Validators.required],
    });
  }
  openTextarea() {
    debugger
    if (this.mydata.condition !== "Pending" && this.mydata.condition !== "Continue" ) {
      if(this.mydata.condition=="Confirmation"){
        debugger
        this.SubmitData = "submit_Registration";
        this.sharedata.sendData(this.SubmitData)
        this.onNoClick(true, null);
      }else{
        this.displayTextarea = true;
      setTimeout(() => {
        this.setFocus();
      }, 300);
      }
    } else {
      this.displayTextarea = false;
      this.onNoClick(true, null);
    }
  }

  onNoClick(value, message) {
    debugger
    this.btnDisabled = false;
    this.dataGO = message;
    console.log("messagess 1======>", this.dataGO);
    this.datasharingFunction2.emit(this.dataGO);
    console.log("messagess======>", this.dataGO);
    // this.SubmitData = "";
    // this.sharedata.sendData(this.SubmitData)
    this.dialogRef.close({ return: value, messageString: message });
  }

  checklength(type) {
    console.log("in", this.messagesTextarea.nativeElement.value.length);
    if (type === 'remark') {
      let count_elements = this.messagesTextarea.nativeElement.value.length;
      this.remarklength = 160 - count_elements;
    }
  }

  Check(message) {
    this.validate = true;
    if (message.value !== "" && message.value.trim().length !== 0) {
      this.validate = false;
    }
  }

  ClosepopupMessage() {
    $("#ConfirmationpopUp").css("visibility", "hidden");
    $("#ConfirmationpopUp").css("opacity", "0");
  }

  private setFocus() {
    this.renderer.selectRootElement(this.messagesTextarea.nativeElement).focus();
  }
  SubmitDocument(){
        this.onNoClick(true, null);
  }
  onFileSelectEvent(event: any, type: string) {
    debugger
    this.viewUploadFile = event.target.files[0];
    this.cancelledCheque = this.viewUploadFile.name;
    sessionStorage.setItem(
      "chequeData","set")
    this.purchaseOrderListService
    

      .fileupload1(this.viewUploadFile ,this.cancelledCheque)
      .subscribe((res) => {
        debugger;
        console.log(JSON.stringify(res));
        if (res[0]?.BankDetails) {
          sessionStorage.setItem(
            "chequeData",
            JSON.stringify(res[0].BankDetails[0])
          )
  }});
  
    this.UploadDocument.get('ChequeAtt').clearValidators();
    this.UploadDocument.get('ChequeAtt').updateValueAndValidity();
    // sessionStorage.setItem()
  }
  close(){
    debugger
    this.cancelledCheque=""
    this.UploadDocument.controls['ChequeAtt'].reset()
  }
}
