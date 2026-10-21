declare var require: any;
export class AppSettings {
  
  // api base url
  public static token: any;
  public static appuser: string;
  public static pagetitle = "Home";
  public static API_ENDPOINT = '';
  public static API_LOCALPOINT = "";
  public static apitime = require('../../assets/configdata/appconfig.json').baseURL;

  public static panDetails = AppSettings.apitime+"/api/Login/chklogin";
  // public static panDetailsdemo = AppSettings.apitime+"/api/Login/chklogindemo";
  public static panDetailsdemo = AppSettings.apitime+"/api/podetails/pOSubmitInvoice1";
  public static sendOTP =  AppSettings.apitime+"/api/Login/chklogin/emailID";
  public static submitpartnergrp = AppSettings.apitime+"/api/simpodetails/updatePartnerGroup"
  public static getpgrpclist = AppSettings.apitime+"/api/simpodetails/getPartnerGroupCompanyDetails";
  public static signIn = AppSettings.apitime+"/api/Login/chklogin/otp";
  public static signonhistory = AppSettings.apitime+"/api/Login/pOSignonhistory";
  public static getgstpincode = AppSettings.apitime+"/api/podetails/pOGSTPincode";
  public static getgst = AppSettings.apitime+"/api/podetails/pOGST";
  public static getpincode = AppSettings.apitime+"/api/podetails/pOPincode";
  public static getorderitems = AppSettings.apitime+"/api/podetails/getorderitems";
  
  public static profileDetails = AppSettings.apitime+"/api/vendordetails/profileData";
  public static saveProfileData = AppSettings.apitime+"/api/vendordetails/updatebussinessdetails";
  public static uploadProductPortfolio = AppSettings.apitime+"/api/file/productProfile";
  public static PurchaseOrderList = AppSettings.apitime+"/api/podetails/pOData";
  public static PurchaseOrderListWOPO = AppSettings.apitime+"/api/podetails/pODatawopo";


  public static purchaseOrderDetails = AppSettings.apitime+"/api/podetails/pOEventDetails";
  public static confirmPurchaseOrder = AppSettings.apitime+"/api/podetails/pOSubmitQuery";
  public static getgrnonpo = AppSettings.apitime+"/api/podetails/getgrnbasedonpo";
  public static getgrnonpoandinvoiced = AppSettings.apitime+"/api/podetails/getgrnbasedoninvoiceandpo";
  public static Getgrnbasedoninvoiceandpo = AppSettings.apitime+"/api/simpodetails/getgrnbasedoninvoiceandpo";
  public static getinvalidinvoicedata = AppSettings.apitime+"/api/simpodetails/getInvalidInvoiceDetails";
  public static  getinternalinvalidcounts = AppSettings.apitime+"/api/simpodetails/getInvalidInvoiceCountForInternalUser";
  public static getInternalInvalidinvoicelist = AppSettings.apitime+"/api/simpodetails/getInvalidInvoiceDetailsForInternalUser";

  public static getMessagesList = AppSettings.apitime+"/api/podetails/pOQueryDetails";
  public static createDelivery = AppSettings.apitime+"/api/podetails/pOCreateDelivery";
  public static createDeliveryPojo = AppSettings.apitime+"/api/podetails/pOCreateDeliverynew";
  public static submitInvoiceDetails = AppSettings.apitime+"/api/podetails/pOSubmitInvoice";
  public static submitInvoiceDetailswithoutPO = AppSettings.apitime+"/api/podetails/nonposubmitinvoice";
  public static senddcn=AppSettings.apitime+"/api/podetails/getorderhavingdcn"
  public static logout = AppSettings.apitime+"/api/podetails/logout";
  public static readandinsertbulkuploadfile = AppSettings.apitime+"/api/podetails/insertbulk";
  public static poInvSearch = AppSettings.apitime+"/api/podetails/pOInvoiceSearchData";
  public static poInvSearchformultiplpo = AppSettings.apitime+"/api/podetails/poInvSearchformultiplpo";
  public static viewInvoiceTracker = AppSettings.apitime+"/api/simpodetails/viewInvoiceTracker";

  public static locDetails = AppSettings.apitime+"/api/podetails/locDetails";
  public static asnDetails = AppSettings.apitime+"/api/podetails/asnDetails";
  public static asnList = AppSettings.apitime+"/api/podetails/asnList";
  public static putASN = AppSettings.apitime+"/api/podetails/putASN";



  
  /*---------------------Invoice Message Api---------------------*/
  public static getUnreadMessage = AppSettings.apitime+"/api/invoiceDetails/invoiceReadChatQuery";
  public static invoiceChat = AppSettings.apitime+"/api/invoiceDetails/invoiceChatQuery";
  public static updateChatStatus = AppSettings.apitime+"/api/invoiceDetails/invoiceChatUpdate";
  public static getInvMessagesList = AppSettings.apitime+"/api/invoiceDetails/invoiceQueryDetails";
  public static trackinvoicestatus = AppSettings.apitime+"/api/invoiceDetails/trackinvoicestatus";
  public static InvalidInvoiceCount = AppSettings.apitime+"/api/simpodetails/getInvalidInvoiceCount";
  public static downloadinvalidinvoice = AppSettings.apitime+"/api/simpodetails/downloadinvalidinvoiceData";
  public static downloadinternalinvalid = AppSettings.apitime+"/api/simpodetails/downloadinternalinvalidinvoiceData";
  public static viewInvoiceTrackerVendor = AppSettings.apitime+"/api/invoiceDetails/viewInvoiceTracker";
  
  
  
  public static downloadPOdetails = AppSettings.apitime+"/api/podetails/getpofile";
  public static downloadinternalPOdetails = AppSettings.apitime+"/api/internalportal/getinternalpofile";
  
  // public static getInvoiceData = AppSettings.apitime+"/api/invoiceDetails/invoiceData";
  public static getfullInvoiceData = AppSettings.apitime+"/api/invoiceDetails/fullinvoiceData";
  
  public static getlistitemsforinvoicenumber = AppSettings.apitime+"/api/invoiceDetails/invoiceLineItemDetails";

  public static getlistitemsforinvoicenumberininternal = AppSettings.apitime+"/api/internalportal/invoiceLineItemDetails";
  
  // public static getlistitemsforinvoicenumber = AppSettings.apitime+"/api/invoiceDetails/invoiceLineItemDetails";

  public static downloadinvoicelist = AppSettings.apitime+"/api/invoiceDetails/downloadinvoiceData";

  public static downloadinternalinvoicelist   = AppSettings.apitime+"/api/internalportal/downloadinternalinvoiceData";
  // public static downloadinternalinvoicelist   = AppSettings.apitime+"/api/internalportal/downloaddashboardinvoicelist";
  // running live api start
  // public static downloadapprovalinvoicelist   = AppSettings.apitime+"/api/internalportal/downloadapprovalinvoicelist"; 
  // running live api end

  public static downloadapprovalinvoicelist   = AppSettings.apitime+"/api/simpodetails/downloadapprovalinvoicelist";

  public static submitFile = AppSettings.apitime+"/api/file/uploadFile";
  public static getFile  = AppSettings.apitime+"/api/file/downloadPopdf";
  public static getASNfile =AppSettings.apitime+"/api/file/downloadfile";
  
  public static getinternalFile  = AppSettings.apitime+"/api/file/downloadinternalFile";
  public static multiplefileupload = AppSettings.apitime+"/api/file/multiplefileuploads?fileType=' '";
  public static internalmultiplefileupload = AppSettings.apitime+"/api/file/multiplefileuploads";
  public static filuploadWithASN = AppSettings.apitime+"/api/file/multiplefileuploads?fileType=ASN";
  public static excelDownload = AppSettings.apitime+"/api/podetails/asnhistorydownload"
    
  public static messageStatusUpdate = AppSettings.apitime+"/api/podetails/pOReadStatusUpdate"
    public static GetInteralUserFAQ = AppSettings.apitime+"/api/simpodetails/faqDetails";

  // public static messageStatusUpdate = "/api/invoiceDetails/invoiceChatQuery"

  public static messageStatus = AppSettings.apitime+"/api/podetails/pOReadStatus"

  public static IRNscannerApi = AppSettings.apitime+"/api/invoiceDetails/IRNDetails"
  public static readbulkuploadfile = AppSettings.apitime+"/api/podetails/insertbulkuploadfile"
  public static createcustomdeliveryitems = AppSettings.apitime+"/api/podetails/createcustomdeliveryitems"
  public static getorderforfullpo = AppSettings.apitime+"/api/podetails/getorderforfullpo"
  public static getwopodetails = AppSettings.apitime+"/api/podetails/getwithoutpodetails"
  public static getVendorReturn = AppSettings.apitime+"/api/invoiceDetails/getVendorReturn";
  public static gethistoricData = AppSettings.apitime+"/api/invoiceDetails/gethistoricinvoice";
  public static getplantcodeordesc  =  AppSettings.apitime+"/api/invoiceDetails/getplantcodeordescc";
  public static deleteemptydeliveries = AppSettings.apitime+"/api/podetails/deleteemptydeliveries";
  public static GetVendorFAQ = AppSettings.apitime+"/api/podetails/faqDetails";

  public static UpdatevendorDataByBuyer=AppSettings.apitime+"/api/vendordetails/updateVenData";
  public static getBigFiveResponseData = AppSettings.apitime+"/api/dashboard/getBigFiveFunctionData"; 
  public static getDeptDetailsData = AppSettings.apitime+"/api/dashboard/getDeptDetails"
  public static getInvoiceAgeingResponseData = AppSettings.apitime+"/api/dashboard/getInvoiceAgeing"
  public static getInvoiceSummeryFunctionWiseData = AppSettings.apitime+"/api/dashboard/getInvoiceSummeryFunctionWise"


  
//=====================================INTERNAL PORTAL========================================================
public static verifyinternalportal = AppSettings.apitime+"/api/Login/chkemail"
public static internalportalLogin = AppSettings.apitime+"/api/Login/user/chklogin"

public static getportalTypeonemail = AppSettings.apitime+"/api/internalportal/getportaltype"
public static signininternal = AppSettings.apitime+"/api/Login/user/chklogin/otp"

public static getinvoicedetailsbasedonemailid = AppSettings.apitime+"/api/internalportal/getinvoicebasedonemailid"
public static getinvoicedetailsbasedonemailidS = AppSettings.apitime+"/api/simpodetails/getsimpoinvoicebasedonemailid"

public static internaltrackinvoicestatus = AppSettings.apitime+"/api/internalportal/trackinvoicestatus";
public static userapprovalupdatestatus = AppSettings.apitime+"/api/internalportal/InvoiceApprovalDataStatus"

public static overallstatusUpdate = AppSettings.apitime+"/api/internalportal/invoiceStatusDetails";

public static userapprovalstatus = AppSettings.apitime+"/api/internalportal/InvoiceApprovalEndUserStatus";
public static managerapprovalstatus = AppSettings.apitime+"/api/internalportal/InvoiceApprovalManagerStatus";

public static updateManagerConfirmerStatus = AppSettings.apitime+"/api/internalportal/InvoiceApprovalConfirmerStatus";

public static managerlistforpproval = AppSettings.apitime+"/api/internalportal/managerDetails";
public static invoiceBankvendorDetails = AppSettings.apitime+"/api/internalportal/invoiceBankvendorIdDetails";

public static addmultipleManagers = AppSettings.apitime+"/api/internalportal/addMultipleManager";
public static addMultipleManagerandConfirmers = AppSettings.apitime+"/api/internalportal/addMultipleManagerwithConfirmer";

public static managercountdetails = AppSettings.apitime+"/api/internalportal/managerCountDetails";

public static getMultipleManagerList = AppSettings.apitime+"/api/internalportal/getMultipleManagerList";
public static searchpeoplefordevenvironment  = AppSettings.apitime+"/api/internalportal/searchpeoplefordev";
public static searchpeople  = AppSettings.apitime+"/api/internalportal/searchpeople";
public static getcustomManagerListfordevenvironment = AppSettings.apitime+"/api/internalportal/getmanagerslistfordev";
public static getcustomManagerList = AppSettings.apitime+"/api/internalportal/getmanagerslist";
public static getstatuschatmessages = AppSettings.apitime+"/api/internalportal/internalquerydetailsofapproval";

public static internalgetcreditadvice = AppSettings.apitime+"/api/internalportal/getcreditadvice";
public static getcreditadvice = AppSettings.apitime+"/api/invoiceDetails/getcreditadvice";
public static createCreditNote = AppSettings.apitime+"/api/invoiceDetails/addcreditNote";
public static getcreditNoteDetails = AppSettings.apitime+"/api/invoiceDetails/getcreditNoteDetails";
public static getinternalcreditNoteDetails = AppSettings.apitime+"/api/internalportal/getintcreditNoteDetails";
public static createCreditAdvice = AppSettings.apitime+"/api/internalportal/shortfallcreditadvice";
public static updatefiles = AppSettings.apitime+"/api/internalportal/insertenduserfiles";

//public static  internalPortalPOList =  AppSettings.apitime+"/api/internalportal/internalpOData";
//public static internalportalLineitems = AppSettings.apitime+"/api/internalportal/internalpOEventDetails";

public static  internalPortalPOList =  AppSettings.apitime+"/api/internalportal/internalpOData";
public static  internalBuyerPortalPOList =  AppSettings.apitime+"/api/internalportal/internalbuyerpOData";
public static  internalBuyerPortalInvoiceList =  AppSettings.apitime+"/api/internalportal/getinvoicebasedonbuyerid";
public static internalportalLineitems = AppSettings.apitime+"/api/internalportal/internalpOEventDetails";
public static  internalBuyerPortalSummaryInvoiceList =  AppSettings.apitime+"/api/internalportal/buyerponinvoicesummery";
public static  InvoicesbasedonUserType =  AppSettings.apitime+"/api/internalportal/internalponinvoicesummery";
public static  InvoicesbasedonUserTypeSimpo =  AppSettings.apitime+"/api/simpodetails/internalponinvoicesummery";
public static  getinternallistitemsforinvoicenumber =  AppSettings.apitime+"/api/internalportal/invoiceLineItemDetails";
public static  getinternallistitemsforinvoicenumberS =  AppSettings.apitime+"/api/simpodetails/simpoInvoiceLineItemDetails";
public static  getinternalplantcodeordesc =  AppSettings.apitime+"/api/internalportal/getplantcodeordescc";
public static  getinternalvendorcodeordesc =  AppSettings.apitime+"/api/internalportal/getvendorname";
public static getmatcodeordesc  =  AppSettings.apitime+"/api/internalportal/getmatcodeordescc";
public static getinternalSearchdata  =  AppSettings.apitime+"/api/internalportal/invoiceinternaldashboardsearch";
public static pointernaldashboardsearch = AppSettings.apitime+"/api/internalportal/pointernaldashboardsearch";
public static  getinternalpurchasegroupdesc =  AppSettings.apitime+"/api/internalportal/getmatcodeordescc";
public static  pointernaldashboarddownload =  AppSettings.apitime+"/api/internalportal/downloaddashboardpolist";
public static  getinternaldashboardSearchdata =  AppSettings.apitime+"/api/internalportal/downloaddashboardinvoicelist";

//=====================================fetchMaster API =====================================================
public static AccountDetails = AppSettings.apitime+"/api/vendordetails/getAccDetails";
public static CompanyCode = AppSettings.apitime+"/api/vendordetails/getcomDetails";
// public static PurchaseOrder = AppSettings.apitime+"/api/vendordetails/
public static purchaseGroup = AppSettings.apitime+"/api/vendordetails/getPurchDetails";

public static SchemaGrpVndr = AppSettings.apitime+"/api/vendordetails/getSchemaDetails";

public static BuisnesTypeMaster = AppSettings.apitime+"/api/vendordetails/getTypeBusDetails";
public static industryMaster = AppSettings.apitime+"/api/vendordetails/getIndustryDetails";
public static GetVendorData = AppSettings.apitime+"/api/vendordetails/getVenReqData";
public static plantCode = AppSettings.apitime+"/api/vendordetails/plantDetails";
// public static PurchaseOrder = AppSettings.apitime+"/api/vendordetails/
public static ConutryKey = AppSettings.apitime+"/api/vendordetails/getCountryDetails";
public static RegionMaster = AppSettings.apitime+"/api/vendordetails/regCountryData";
public static plantMaster = AppSettings.apitime+"/api/vendordetails/plantDetails";
public static purchaseOrg = AppSettings.apitime+"/api/vendordetails/purchOrganiDetails";
public static orderCurr= AppSettings.apitime+"/api/vendordetails/orderCurrDetails";
public static paymnetTErms= AppSettings.apitime+"/api/vendordetails/paymentTerms";
public static Conf= AppSettings.apitime+"/api/vendordetails/confControlDetails";
public static reconAcDetails= AppSettings.apitime+"/api/vendordetails/reconAcDetails";
public static purorgMaster= AppSettings.apitime+"/api/vendordetails/getPorgComp";

public static bankKeyDetails= AppSettings.apitime+"/api/vendordetails/bankKeyDetails";  
public static planingrp= AppSettings.apitime+"/api/vendordetails/camaGroupDetails";
public static paymentMethod = AppSettings.apitime+"/api/vendordetails/getPayMethod";
public static gettitleMaster = AppSettings.apitime+"/api/vendordetails/getTitle";
public static softkey = AppSettings.apitime+"/api/vendordetails/getSort";
public static WithTCode= AppSettings.apitime+"/api/vendordetails/getWhtCode";
public static WithTtype= AppSettings.apitime+"/api/vendordetails/getWhtType";

// =============INTERNALPORTAL CHAT=========================

public static  getInvMessages =AppSettings.apitime+"/api/internalportal/internalquerydetails";
public static sendInvMessages= AppSettings.apitime+"/api/internalportal/internalInvoiceChatSubmit";
public static internalInvoiceStatusSubmit= AppSettings.apitime+"/api/internalportal/internalInvoiceStatusSubmit";

public static getPOMessages= AppSettings.apitime+"/api/internalportal/internalpOMessages";
public static sendPOMessages =  AppSettings.apitime+"/api/internalportal/internalpOSubmitQuery";
public static pomessageReadStatus= AppSettings.apitime+"/api/internalportal/internalpOReadStatus";
public static updateInternalChatStatus = AppSettings.apitime+"/api/internalportal/internalChatUpdate";
public static getInternalInvoicemessageStatus = AppSettings.apitime+"/api/internalportal/internalInvoiceReadChatQuery";
public static getinternalorderitems = AppSettings.apitime+"/api/internalportal/getorderitems";
public static reassignenduser = AppSettings.apitime+"/api/internalportal/reassigninvoice";
public static updateacceptedquantityofinvoice = AppSettings.apitime+"/api/internalportal/updateacceptedquantity";
public static updateacceptedquantityofinvoicewithoutgrn = AppSettings.apitime+"/api/internalportal/updateacceptedquantitywithoutgrn";

public static updateacceptedservicequantityofinvoice = AppSettings.apitime+"/api/internalportal/updateacceptedservicequantity";
public static updateacceptedservicequantityofinvoiceforsimpo = AppSettings.apitime+"/api/simpodetails/updateacceptedservicequantity";
public static updateacceptedservicequantityofinvoicewithoutinvoice = AppSettings.apitime+"/api/internalportal/updateacceptedservicequantitywithoutgrn";
public static updateacceptedservicequantityofinvoicewithoutinvoiceforsimpo = AppSettings.apitime+"/api/simpodetails/updateacceptedservicequantitywithoutgrnforsimpo";

public static getportalid = AppSettings.apitime+"/api/internalportal/getportalidfromemail";

public static getstoragelocation = AppSettings.apitime+"/api/internalportal/getstorage";
public static updateenduseretails = AppSettings.apitime+"/api/internalportal/updateenduserspecialdetails";

public static getEndUserReturn  =  AppSettings.apitime+"/api/internalportal/getEnderUserReturn";
public static getidsbasedonmaterial  =  AppSettings.apitime+"/api/internalportal/getemailidsbasedonmaterial";
public static multiuploadVen=AppSettings.apitime+"/api/file/addtionalfilesUploads"
public static PanGSVal= AppSettings.apitime+"/api/vendordetails/checkPanGST";

public static CheckActiveInactivePan = AppSettings.apitime+"/api/external/checkPanNumber";
public static CheckActiveInactiveGst = AppSettings.apitime+"/api/external/checkGSTNumber";
public static DownloadPDF = AppSettings.apitime+"/api/external/downloadPDF";




// ===================================================Simpo===============================================
public static createcustomdeliveryitemsforsimpo1 = AppSettings.apitime+"/api/simpodetails/createcustomdeliveryitemsforsimpo";
public static createcustomdeliverywithitemforsimpodc = AppSettings.apitime+"/api/simpodetails/createcustomdeliveryitemsforsimpowithdc";
public static getorderhavingdcnforsimpo = AppSettings.apitime+"/api/simpodetails/getorderhavingdcnforsimpo";
public static deleteemptydeliveriessimpo = AppSettings.apitime+"/api/simpodetails/deleteemptydeliveriessimpo";
public static simposubmitinvoice = AppSettings.apitime+"/api/simpodetails/simpoSubmitInvoice";
public static simPoProcessedPos = AppSettings.apitime+"/api/simpodetails/simPoProcessedPos";
public static Getgrnbaseonpo = AppSettings.apitime+"/api/simpodetails/getgrnbasedonpo";
public static simPoEventDetails = AppSettings.apitime+"/api/simpodetails/simPoEventDetails";
public static getsimpoInvoiceLineItemDetails = AppSettings.apitime+"/api/simpodetails/simpoInvoiceLineItemDetails";
public static getsimpoTrackInvoiceLineItemDetails = AppSettings.apitime+"/api/simpodetails/simpoTrackInvoiceLineItemDetails";
public static getInvoiceData = AppSettings.apitime+"/api/simpodetails/invoiceData";
public static updateacceptedquantityofinvoiceformultigrn = AppSettings.apitime+"/api/simpodetails/updateacceptedquantity";
public static updateacceptedquantityofinvoicewithoutgrnforsimpo = AppSettings.apitime+"/api/simpodetails/updateacceptedquantitywithoutgrn";
public static getEndUserReturnSimpo  =  AppSettings.apitime+"/api/simpodetails/getEnderUserReturnforsimpo";
public static getVendorReturnforsimpo = AppSettings.apitime+"/api/simpodetails/getVendorReturn";
public static managerapprovalstatusforsimpo = AppSettings.apitime+"/api/simpodetails/SimpoInvoiceApprovalManagerStatus";
//=====================================Vendor Registration =====================================================
public static VendorLogin = AppSettings.apitime+"/api/Login/vendorRegCheck";
public static VendorRegistration = AppSettings.apitime+"/api/Login/vendorReg";
public static VendorOTPCheck = AppSettings.apitime+"/api/Login/vendorOTPCheck";
public static GetDocumentRead = AppSettings.apitime+"/api/file/vendorProfile";
public static submitVendorReg =AppSettings.apitime+"/api/file/submitVendorReg";
public static submitamendment = AppSettings.apitime+"/api/vendordetails/submitVendorAmendment";
public static getVendorDetails = AppSettings.apitime+"/api/vendordetails/vendorRegData";
//=====================================INTERNAL PORTAL END=====================================================
  //=====================================OTP Times ========================================================
  // static OTP_TIME: number = 119;
  static OTP_TIME: number=300;
}