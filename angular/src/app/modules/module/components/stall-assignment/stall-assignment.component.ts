import { Component, OnInit, Inject } from '@angular/core';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import * as jsPDF from 'jspdf';
interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}
import * as moment from 'moment';
import { StallService } from '../../../../core/services/stall.service';
import { MatDialogRef, MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackbarComponent } from '../../../../shared/ui/mat-snackbar/mat-snackbar.component';
import { GroupService } from 'src/app/core/services/group.service';
import { ReportemailComponent } from 'src/app/shared/ui/modals/reportemail/reportemail.component';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-stall-assignment',
  templateUrl: './stall-assignment.component.html',
  styleUrls: ['./stall-assignment.component.scss']
})
export class StallAssignmentComponent implements OnInit {
  loading = false;
  stallResponse: any
  allAssignedStalls: any = [];
  StallTypes: any = [];
  hoverStallId:any;
  hoverStallName:any;
  hoverBookedByType:any;
  hoverStallType:any;
  TypeOfStallReport: any;
  reportName: any;
  reportType: any;
  reportemailid: string = "";
  allResultClass: boolean = true;
  resultClassId: any = null;
  paddockClassId: any = null;
  selectedpaddockClasssname = "";
  allPaddockClass: boolean = true
  programClassId: any = null;
  selectedprogramClasssname = "";
  allProgramClass: boolean = true;
  AssignedStallsData: any[]=[];
  AllStallsData: any[]=[];
  UnAssignedStallData: any[]=[];
  selectedRowIndex: any;

  constructor(private groupService: GroupService,
     private stallService: StallService,
    private snackBar: MatSnackbarComponent,
    private dialog: MatDialog,
    private reportService: ReportService,
   ) { }

  ngOnInit(): void {
    this.getAllStallTypes();
    this.getAllAssignedStalls();
    this.getAllAssignedStalls1();
    
  }
  getAllStallTypes() {

    this.StallTypes = [];
    this.groupService.getGlobalCodes('StallType').subscribe(response => {
      if (response.Data != null && response.Data.totalRecords > 0) {
        this.StallTypes = response.Data.globalCodeResponse;
      }
    }, error => {

    })
  }

  getAllAssignedStalls() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.allAssignedStalls = [];
      this.stallService.getAllAssignedStalls().subscribe(response => {
        if (response.Data != null && response.Data.TotalRecords > 0) {
          this.allAssignedStalls = response.Data.stallResponses;
        }
        if (this.allAssignedStalls != null && this.allAssignedStalls.length > 0) {
          this.allAssignedStalls.forEach(data => {
            var s_id = String('stall_' + data.StallId);
            var element = document.getElementById(s_id);
            if (element != null && element != undefined) {
                element.classList.add("bookedstall");
                element.addEventListener('mouseover', () => this.ShowStallDetail(data.StallId))
            }
          });
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      })
      resolve();
    });
  }

  assignStall(stallId) {

  }
  
counter(i: number) {
  return new Array(i);
}
  
  changeTab() {
    this.closehoverbox();
    if (this.allAssignedStalls != null && this.allAssignedStalls != undefined && this.allAssignedStalls.length > 0) {
      this.allAssignedStalls.forEach(data => {
        var s_id = String('stall_' + data.StallId);
        var element = document.getElementById(s_id);

        if (element != null && element != undefined) {
          element.classList.add("bookedstall");
          element.classList.remove("bookedgroupstall");
          element.classList.remove("clstackstall");
          element.classList.remove("unassignedgroupstall");
          element.addEventListener('mouseover', () => this.ShowStallDetail(data.StallId));
        }
      });
    }
    
  }

  ShowStallDetail(val) {
    debugger
    var checkInAllassigned = this.allAssignedStalls.filter((x) => { return x.StallId == val });
    
    if (checkInAllassigned != null && checkInAllassigned != undefined && checkInAllassigned.length > 0)
    {
      document.getElementById("hoverbox").style.display = "block";
      this.hoverStallId=checkInAllassigned[0].StallId;
      this.hoverStallName=checkInAllassigned[0].BookedByName;
      this.hoverBookedByType=checkInAllassigned[0].BookedByType;
      var type=this.StallTypes.filter((x) => { return x.GlobalCodeId == checkInAllassigned[0].StallAssignmentTypeId });
      this.hoverStallType=type[0].CodeName;

    }
    return false;
  }

  closehoverbox(){
    document.getElementById("hoverbox").style.display = "none";
  }


  //Report Data

  getAllAssignedStalls1() {
    this.stallService.getAllAssignedStalls().subscribe((data: any) => {
      if (data) {
        debugger

        data.Data.stallResponses.forEach(element => {
          // let stall = new StallModel();
          // stall.Occupant = element.BookedByName
          // stall.StallNo = element.StallId
          // stall.Type = element.BookedByType
          this.AssignedStallsData.push(element);
        });

        console.log("getAllAssignedStalls", this.AssignedStallsData)
        this.allStalls();
      }
    })
  }

  allStalls() {
    for (let index = 1; index <= 1012; index++) {
      debugger

      let checkIfFound:any[]
        checkIfFound   = this.AssignedStallsData.filter(x => x.StallId == index);
      debugger
      if (checkIfFound.length>0) {
        // let stall = new StallModel();
        // stall.Occupant = checkIfFound.Occupant;
        // stall.StallNo = checkIfFound.StallNo;
        // stall.Type = checkIfFound.Type;

        if (checkIfFound[0].StallAssignmentTypeId == 3009) {
          checkIfFound[0].BookedByType = "Horse"
        }
        else
        {
          checkIfFound[0].BookedByType = "Tack"
        }

        let foundObj = {BookedByName: checkIfFound[0].BookedByName,
        BookedByType: checkIfFound[0].BookedByType,
        ExhibitorId: checkIfFound[0].ExhibitorId,
        GroupId: checkIfFound[0].GroupId,
        StallAssignmentId: checkIfFound[0].StallAssignmentId,
        StallAssignmentTypeId: checkIfFound[0].StallAssignmentTypeId,
        StallId: checkIfFound[0].StallId}

        this.AllStallsData.push(foundObj)
      }
      else {
        // let stall = new StallModel();
        // stall.Occupant = "";
        // stall.StallNo = index + 1;
        // stall.Type = "";

        let notFountobj = {BookedByName: "UnAssigned",
        BookedByType: "",
        ExhibitorId: 0,
        GroupId: 0,
        StallAssignmentId: 0,
        StallAssignmentTypeId: 0,
        StallId: index}
        this.UnAssignedStallData.push(notFountobj);
        this.AllStallsData.push(notFountobj);
      }
    }
    //console.log("AllStallsData", this.AllStallsData);
  }

  selectReport(i, report) {
    this.selectedRowIndex = i;
    this.reportName = report;
  }

  showpopupbox(elementid: string, hidearrow: string, showarrow: string) {
    debugger
    var popboxes = document.getElementsByClassName("mmHoverContent");
    if (popboxes != null && popboxes != undefined && popboxes.length > 0) {
      for (var i = 0; i < popboxes.length; i++) {
        popboxes[i].classList.remove("showmybox");
        popboxes[i].classList.add("hidemybox");
      }
    }

    var element = document.getElementById(elementid);
    if (element != null && element != undefined) {
      element.classList.remove("hidemybox");
      element.classList.add("showmybox");
    }


    var hideElement = document.getElementById(hidearrow);
    if (hideElement != null && hideElement != undefined) {
      hideElement.classList.add("hidemybox");
      hideElement.classList.remove("showmybox");
    }

    var showElement = document.getElementById(showarrow);
    if (showElement != null && showElement != undefined) {
      showElement.classList.remove("hidemybox");
      showElement.classList.add("showmybox");
    }

  }

  hidepopupbox(elementid: string, hidearrow: string, showarrow: string) {

    var element = document.getElementById(elementid);
    if (element != null && element != undefined) {
      element.classList.remove("showmybox");
      element.classList.add("hidemybox");
    }

    var hideElement = document.getElementById(hidearrow);
    if (hideElement != null && hideElement != undefined) {
      hideElement.classList.add("hidemybox");
      hideElement.classList.remove("showmybox");
    }

    var showElement = document.getElementById(showarrow);
    if (showElement != null && showElement != undefined) {
      showElement.classList.remove("hidemybox");
      showElement.classList.add("showmybox");
    }
  }

  checkChange(value, type) {
     if (type == "getallStallList") {
      this.TypeOfStallReport = type;
    }
    else if (type == "getUnassignStallList") {
      this.TypeOfStallReport = type;
    }
    else if (type == "getAssignedStallList") {
      this.TypeOfStallReport = type;
    }
  }

  setreportType(type: string, name: string) {
    this.reportName = name;
    this.reportType = type;
    if (type == "email") {
      const dialogRef = this.dialog.open(ReportemailComponent, {
        maxWidth: "400px",
        data: ""
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult != null && dialogResult != undefined) {
          if (dialogResult.submitted == true) {
            this.reportemailid = dialogResult.data;
            this.download();
          }
        }

      });
    }
    else {
      this.download();
    }
  }

  validate() {
    if (this.reportName === "result" && this.allResultClass === false && this.resultClassId === null) {
      this.snackBar.openSnackBar("Please select class", 'Close', 'red-snackbar');
      return false;
    }

    if (this.reportName === "paddock" && this.allPaddockClass === false && this.paddockClassId === null) {
      this.snackBar.openSnackBar("Please select class", 'Close', 'red-snackbar');
      return false;
    }

    if (this.reportName === "program" && this.allProgramClass === false && this.programClassId === null) {
      this.snackBar.openSnackBar("Please select class", 'Close', 'red-snackbar');
      return false;
    }
    return true;
  }

  download() {
    if (this.validate()) {

      if (this.reportName == "Stall") {
        debugger
        if (this.TypeOfStallReport == "getallStallList") {
          //this.allStalls();
          this.getallStallList();
        }
        else if (this.TypeOfStallReport == "getUnassignStallList") {
          this.getUnassignStallList()
        }
        else if (this.TypeOfStallReport == "getAssignedStallList") {
          this.getAllAssignedStalls1();
          this.getAssignedStallList();
        }
        else
        {
          this.getallStallList();
        }
      }
    }
  }

  setPrintReportOptions(reportname: string, type: string, doc: any) {

    if (type == "display") {
      window.open(doc.output('bloburl'), '_blank');
      this.loading = false;
    }

    if (type == "download") {
      doc.save(reportname + '.pdf');
      this.loading = false;
    }

    if (type == "print") {
      var printFile = window.open(doc.output('bloburl'))
      setTimeout(function () {
        printFile.print();
      }, 2000);
      this.loading = false;
    }

    if (type == "email") {
      this.loading = true;
      var datauristring = doc.output('datauristring');

      var data = {
        emailid: this.reportemailid,
        reportfile: datauristring
      }

      this.reportService.SaveAndEmail(data).subscribe(response => {
        if (response != null || response != undefined) {

          this.snackBar.openSnackBar(response.message, 'Close', 'green-snackbar');
        }
        this.loading = false;
      },

        error => {
          this.snackBar.openSnackBar("Error!", 'Close', 'red-snackbar');
          this.loading = false;
        }

      )
    }

  }

  getallStallList(){
    let doc = new jsPDF("p", "mm", "a4") as jsPDFWithPlugin;
    doc.setFontSize(8);
    let y = 8;
    doc.text('Print Date :', 160, 8)
    doc.text(String(moment(new Date()).format('MM-DD-yyyy')), 180, 8)
    doc.line(0, 10, 300, 10);

    //var text = String('&nbsp<b>Stall and Occupants</b>');
    var text = String('&nbsp&nbsp<b></b>');
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.fromHTML(text, textOffset, 10);

    let pageHeight = doc.internal.pageSize.height;
    //doc.fromHTML(String('<b>Assigned</b>'), textOffset, 15)
    doc.fromHTML(String('<b>All Stall and Occupants</b>'), textOffset, 19)
    doc.fromHTML(String('<b>____________________</b>'), textOffset, 19)

    doc.autoTable({
      body: this.AllStallsData,
      columns:
        [
          { header: 'Stall No', dataKey: 'StallId' },
          { header: 'Occupant', dataKey: 'BookedByName' },
          { header: 'Type', dataKey: 'BookedByType' },
        ],
      margin: { vertical: 35, horizontal: 10 },
      startY: 30
    })

    this.setPrintReportOptions("allstallsreport", this.reportType, doc);
  }

  getUnassignStallList(){
    let doc = new jsPDF("p", "mm", "a4") as jsPDFWithPlugin;
    doc.setFontSize(8);
    let y = 8;
    doc.text('Print Date :', 160, 8)
    doc.text(String(moment(new Date()).format('MM-DD-yyyy')), 180, 8)
    doc.line(0, 10, 300, 10);

    //var text = String('&nbsp<b>Stall and Occupants</b>');
    var text = String('&nbsp<b></b>');
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 3;
    doc.fromHTML(text, textOffset, 10);

    let pageHeight = doc.internal.pageSize.height;
    //doc.fromHTML(String('<b>Assigned</b>'), textOffset, 15)
    doc.fromHTML(String('<b>Unassigned Stalls Stall and Occupants</b>'), textOffset, 15)
    doc.fromHTML(String('<b>_________________________________</b>'), textOffset, 15)

    doc.autoTable({
      body: this.UnAssignedStallData,
      columns:
        [
          { header: 'Stall No', dataKey: 'StallId' },
          { header: 'Occupant', dataKey: 'BookedByName' },
          { header: 'Type', dataKey: 'BookedByType' },
        ],
      margin: { vertical: 35, horizontal: 10 },
      startY: 30
    })

    this.setPrintReportOptions("allstallsreport", this.reportType, doc);
  }

  getAssignedStallList(){
    let doc = new jsPDF("p", "mm", "a4") as jsPDFWithPlugin;
    doc.setFontSize(8);
    let y = 8;
    doc.text('Print Date :', 160, 8)
    doc.text(String(moment(new Date()).format('MM-DD-yyyy')), 180, 8)
    doc.line(0, 10, 300, 10);

    //var text = String('&nbsp<b>Stall and Occupants</b>');
    var text = String('&nbsp<b></b>');
    var textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 3;
    doc.fromHTML(text, textOffset, 10);

    let pageHeight = doc.internal.pageSize.height;
    //doc.fromHTML(String('<b>Assigned</b>'), textOffset, 15)
    doc.fromHTML(String('<b>Assigned Stall and Occupants</b>'), textOffset, 15)
    doc.fromHTML(String('<b>__________________________</b>'), textOffset, 15)

    doc.autoTable({
      body: this.AssignedStallsData,
      columns:
        [
          { header: 'Stall No', dataKey: 'StallId' },
          { header: 'Occupant', dataKey: 'BookedByName' },
          { header: 'Type', dataKey: 'BookedByType' },
        ],
      margin: { vertical: 35, horizontal: 10 },
      startY: 30
    })

    this.setPrintReportOptions("assignedstallsreport", this.reportType, doc);
  }
}
