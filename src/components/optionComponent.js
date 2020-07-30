import React, { Component } from "react";
import Upload from "./imageComponent";
import Popmain from "./popmain";
import Sdrop from "./searchdrop";
import Datepic from "./Datepic";
import Check from "./checkComponent";
import PhoneVerify from "./phoneverify";
import { firebase } from "./firebase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TrackComp from "./searchStatus"
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      docId: "Loading please wait ...",
      cl: [],
      attachments: [],
      location: [],
      doneBy: [],
      stateDist: []
    };
  }
  
  componentWillMount() {
    const { steps } = this.props;
    console.log(steps);
    if ("") console.log("Yes it is present");
    this.state.cl.push("" + steps.Select_date.value + "");
    this.state.cl.push(steps.Delay_exp.value);
    this.state.cl.push(steps.desc.value);
    this.state.stateDist.push(steps.incident_menu.value.state);
    this.state.stateDist.push(steps.incident_menu.value.district);
    this.state.stateDist.push(steps.incident_menu.value.psregion)
    var i;
    try {
      for (i = 0; i < steps.Upload.value.length; i++)
        this.state.attachments.push(steps.Upload.value[i]);
    } catch (error) {}
    try {
      for (i = 0; i < steps.Loc_Details.value.length; i++)
        this.state.location.push(
          steps.Loc_Details.value[i].lat + "/" + steps.Loc_Details.value[i].lng
        );
    } catch {}
    try {
      this.state.doneBy.push(steps.Complaint_type.value);
    } catch (error) {
      this.state.doneBy.push("Personal");
    }
    if (this.state.doneBy[0] === "Personal") {
      this.state.doneBy.push(steps.otp.value.phonenumber);
      this.state.doneBy.push(steps.otp.value.uid);
      this.state.doneBy.push(steps.name.value);
      this.state.doneBy.push(steps.email.value);
      this.state.doneBy.push(steps.POF.value);
      this.state.doneBy.push(steps.number_pof.value);
    }
    this.state.cl.push(steps.Category.value);
    if (
      this.state.cl[this.state.cl.length - 1] ===
      "Child Sex Abuse/Rape/Obstacenity"
    )
      this.state.cl.push(steps.Category_1.value);
    else if (this.state.cl[this.state.cl.length - 1] === "Cyber Crime") {
      this.state.cl.push(steps.Category_2.value);
      if (steps.Category_2.value === "Loss of Money") {
        if ("Banking" in steps) {
          this.state.cl.push("Banking/E-Wallet/Demat");
          this.state.cl.push(steps.Banking.value);
        } else if ("Online" in steps) {
          this.state.cl.push(
            "Job/Matrimonial,E-commerce,Fradulent SMS/Media Content/call"
          );
          this.state.cl.push(steps.Online.value);
        } else if ("Email_Fraud" in steps) {
          this.state.cl.push("Email Fraud");
          this.state.cl.push(steps.Email_Fraud.value);
        }
      } else if (steps.Category_2.value === "Online Harassment") {
        this.state.cl.push(steps.Online_Harassment.value);
      } else if (steps.Category_2.value === "Hacking") {
        if ("Profile_Hacking" in steps) {
          this.state.cl.push("Profile Hacking");
          this.state.cl.push(steps.Profile_Hacking.value);
        } else if ("Computer" in steps) {
          this.state.cl.push("Computer Hacking");
          this.state.cl.push(steps.Computer.value);
        }
      } else {
        this.state.cl.push(steps.Other.value);
      }
    }
    /* try{
            if(steps.Category_1.value) this.state.doneBy.push(steps.Category_1.value);
            else if(steps.Banking.value)  this.state.doneBy.push(steps.Banking.value);
            else if(steps.Online.value)  this.state.doneBy.push(steps.Online.value);
            else if(steps.Email_Fraud.value)  this.state.doneBy.push(steps.Email_Fraud.value);
            else if(steps.Online_Harassment.value)  this.state.doneBy.push(steps.Online_Harassment.value);
            else if(steps.Profile_Hacking.value)  this.state.doneBy.push(steps.Profile_Hacking.value);
            else if(steps.Computer.value)  this.state.doneBy.push(steps.Computer.value);
            else this.state.doneBy.push(steps.Other.value);
        }catch{

        } */
    // this.state.total_list.push(this.state.cl);
    // this.state.total_list.push(this.state.attachments);
    // this.state.total_list.push(this.state.location);
    // this.state.total_list.push(this.state.doneBy);
    //console.log(this.state.total_list);
    console.log({
      Attachments: this.state.attachments,
      created: ""+Date().toString()+"",
      Description: this.state.cl,
      DoneBy: this.state.doneBy,
      Location: this.state.location,
      Place: this.state.stateDist,
      Status: "Pending",
      Remarks: "None"
    })
    const db = firebase.firestore();
    db.collection("Issues")
      .add({
        Attachments: this.state.attachments,
        created: ""+Date().toString()+"",
        Description: this.state.cl,
        DoneBy: this.state.doneBy,
        Location: this.state.location,
        Place: this.state.stateDist,
        Status: "Pending",
        Remarks: "None"
      })
      .then((data) => {
        console.log(data.id);
        this.setState({
          docId: data.id
        })
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div>
            <p>Your Data is Saved Succefully</p>
            <p>
              Your Document id is:{" "}
              <strong style={{ color: "green" }}>{this.state.docId}</strong>
            </p>
          </div>
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {this.state.docId !== "Loading please wait ..." ? (
            <CopyToClipboard text={this.state.docId}
              onCopy={() => this.setState({status: "Copied!"})}>
              <button className="button1">Copy id to clipboard</button>
            </CopyToClipboard>
          ) : null}
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" ,margin:"10px"}}
        >
          {this.state.status !== "" ? (
            <span style={{color: "green", fontWeight:"bold"}}>{this.state.status}</span>
          ) : null}
          
        </div>
      </div>
    );
  }
}

const STEPS = [
  {
    id: "Greetings",
    message:
      "Namaste, I am CyberDost! I am here to assist you regarding Cyber Crime Complaints",
    trigger: "2",
  },
  {
    id: "2",
    message: "Select the Type of Service:",
    trigger: "Service",
  },
  {
    id: "Service",
    options: [
      {
        value: "Report",
        label: "Report a Complaint",
        trigger: "Report",
      },
      {
        value: "Safety",
        label: "Safety Tips",
        trigger: "Reference",
      },
      {
        value: "Tract",
        label: "Track the Complaint",
        trigger: "TrackComplaint",
      },
    ],
  },
  {
    id: "TrackComplaint",
    component: <TrackComp/>,
    end: true
  },
  {
    id: "Report",
    message: "Do you want to Register Here or on Website",
    trigger: "Register-Types",
  },
  {
    id: "Register-Types",
    options: [
      {
        value: "Here",
        label: "On-Chat",
        trigger: "On-Chat",
      },
      {
        value: "web",
        label: "WebSite",
        trigger: "Reference",
      },
    ],
  },
  {
    id: "On-Chat",
    message: "Select Type of Crime:",
    trigger: "Category",
  },
  {
    id: "Category",
    options: [
      {
        value: "Child Sex Abuse/Rape/Obstacenity",
        label: "Child Sex Abuse/Rape/Obstacenity",
        trigger: "Non_Cyber",
      },
      {
        value: "Cyber Crime",
        label: "Cyber Crime",
        trigger: "Cyber",
      },
    ],
  },
  {
    id: "Non_Cyber",
    message: "How u want Register:",
    //component: <div><button>Anonymous</button><button>Personal</button></div>,
    trigger: "Complaint_type",
  },
  {
    id: "Complaint_type",
    options: [
      {
        value: "Anonymous",
        label: "Anonymous",
        trigger: "Categoty_CRSO",
      },
      {
        value: "Personal",
        label: "Personal",
        trigger: "Authentication",
      },
    ],
  },
  {
    id: "Categoty_CRSO",
    message: "Select type of Crime in Non_cyber: ",
    trigger: "Category_1",
  },
  {
    id: "Category_1",
    options: [
      {
        value: "Child Pornography",
        label: "Child Pornography",
        trigger: "Date_module",
      },
      {
        value: "Rape/Gang Rape",
        label: "Rape/Gang Rape",
        trigger: "Date_module",
      },
      {
        value: "Sexual Obscenity",
        label: "Sexual Obscenity",
        trigger: "Date_module",
      },
      {
        value: "Sexually Explicit",
        label: "Sexually Explicit",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Cyber",
    message: "Verifying your Identification:",
    trigger: "Authentication",
  },
  {
    id: "Authentication",
    message: "Enter Your Mobile Number?",
    trigger: "otp",
  },
  /* {
        id: 'phone_no',
        user: true,
        trigger: 're-check',
        validator: (value) => {
            if (isNaN(value)) {
              return 'value must be a number';
            } else if (value < 0) {
              return 'value must be positive';
            }
            return true;
          },
    },
    {
        id: 're-check',
        message: 'Do you want Continue or change phone number',
        trigger: 'check-option'
    },
    {
        id: 'check-option',
        options: [
            {
                value: 'yes',
                label: 'YES',
                trigger: 'Authentication',
            },
            {
                value: 'no',
                label: 'NO',
                trigger: 'otp',
            }
        ],
    }, */
  {
    id: "otp",
    component: <PhoneVerify />,
    waitAction: true,
  },
  /* {
        id: 'otp',
        message: 'Enter OTP which is sent to your mobile',
        trigger: 'otp_value',
    },
    {
        id: 'otp_value',
        user: true,
        trigger: 'Name',
        validator: (value) => {
            if (isNaN(value)) {
              return 'value must be a number';
            } else if (value < 0) {
              return 'value must be positive';
            }
            return true;
          },
    }, */
  /* {
        id: 'verification',
        component: '',
        waitAction: true,
    }, */
  /* {
        id: 'Wrong',
        message: 'Please Enter Correct OTP',
        trigger: 'otp_value',
    }, */
  {
    //from component
    id: "Name",
    message: "What is your name?",
    trigger: "name",
  },
  {
    id: "name",
    user: true,
    trigger: "email-id",
  },
  {
    id: "email-id",
    message: "Enter Email:",
    trigger: "email",
  },
  {
    id: "email",
    user: true,
    trigger: "Official_doc",
  },
  {
    id: "Official_doc",
    message: "Select the Proof of Identity",
    trigger: "POF",
  },
  {
    id: "POF",
    options: [
      {
        value: "Aadhar",
        label: "Aadhar Number",
        trigger: "pof_input",
      },
      {
        value: "PAN Card",
        label: "PAD Card",
        trigger: "pof_input",
      },
      {
        value: "Voter",
        label: "Voter ID",
        trigger: "pof_input",
      },
    ],
  },
  {
    id: "pof_input",
    message: "Enter {previousValue} number!",
    trigger: "number_pof",
  },
  {
    id: "number_pof",
    user: true,
    trigger: "Crime_type",
  },
  {
    id: "Crime_type",
    component: <Check />,
    asMessage: true,
    waitAction: true,
  },
  {
    id: "Cyber_type",
    message: "Select the type of Cyber Crime:",
    trigger: "Category_2",
  },
  {
    id: "Category_2",
    options: [
      {
        value: "Loss of Money",
        label: "Loss of Money",
        trigger: "Cat-21",
      },
      {
        value: "Online Harassment",
        label: "Online Harassment",
        trigger: "Cat-22",
      },
      {
        value: "Hacking",
        label: "Hacking",
        trigger: "Cat-23",
      },
      {
        value: "Other online Crime",
        label: "Other online Crime",
        trigger: "Cat-24",
      },
    ],
  },
  {
    id: "Cat-21",
    message: "Select Category in Loss of Money",
    trigger: "Loss_money",
  },
  {
    id: "Loss_money",
    options: [
      {
        value: "Banking/E-Wallet/Demat",
        label: "Banking/E-Wallet/Demat",
        trigger: "Cat-210",
      },
      {
        value: "Job/Matrimonial,E-commerce,Fradulent SMS/Media Content/call",
        label: "Job/Matrimonial,E-commerce,Fradulent SMS/Media Content/call",
        trigger: "Cat-211",
      },
      {
        value: "Email Fraud",
        label: "Email Fraud",
        trigger: "Cat-212",
      },
    ],
  },
  {
    id: "Cat-210",
    message: "Select how money lost in Banking:",
    trigger: "Banking",
  },
  {
    id: "Banking",
    options: [
      {
        value: "Misuse of Credit/Debit Card/ATM Fraud",
        label: "Misuse of Credit/Debit Card/ATM Fraud",
        trigger: "Date_module",
      },
      {
        value: "Unauthorized Access Through Internet Banking",
        label: "Unauthorized Access Through Internet Banking",
        trigger: "Date_module",
      },
      {
        value: "Cryptocurrency/Bitcoin",
        label: "Cryptocurrency/Bitcoin",
        trigger: "Date_module",
      },
      {
        value: "E-Wallet Fraud,Demat/Mutual Fund",
        label: "E-Wallet Fraud,Demat/Mutual Fund",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Cat-211",
    message: "Select how money lost in Online:",
    trigger: "Online",
  },
  {
    id: "Online",
    options: [
      {
        value: "online Job Fraud",
        label: "online Job Fraud",
        trigger: "Date_module",
      },
      {
        value: "Online Matrimonial Fraud",
        label: "Online Matrimonial Fraud",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Cat-212",
    message: "Select how money lost in Email Fraud:",
    trigger: "Email_Fraud",
  },
  {
    id: "Email_Fraud",
    options: [
      {
        value: "Spoof Email",
        label: "Spoof Email",
        trigger: "Date_module",
      },
      {
        value: "Business Email",
        label: "Business Email",
        trigger: "Date_module",
      },
      {
        value: "Compromise",
        label: "Compromise",
        trigger: "Date_module",
      },
      {
        value: "Email Hacking",
        label: "Email Hacking",
        trigger: "Date_module",
      },
      {
        value: "Threatening Email",
        label: "Threatening Email",
        trigger: "Date_module",
      },
      {
        value: "Phishing Email",
        label: "Phishing Email",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Cat-22",
    message: "Select Type in Online Harassment:",
    trigger: "Online_Harassment",
  },
  {
    id: "Online_Harassment",
    options: [
      {
        value: "Receving Offensive Messages",
        label: "Receving Offensive Messages",
        trigger: "Date_module",
      },
      {
        value: "Online Bulying/Stalking",
        label: "Online Bulying/Stalking",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Cat-23",
    message: "Select type of Hacking:",
    trigger: "Hacking",
  },
  {
    id: "Hacking",
    options: [
      {
        value: "Profile Hacking",
        label: "Profile Hacking",
        trigger: "Cat-230",
      },
      {
        value: "Computer Hacking",
        label: "Computer Hacking",
        trigger: "Cat-231",
      },
    ],
  },
  {
    id: "Cat-230",
    message: "Select type of Hacking in Profile:",
    trigger: "Profile_Hacking",
  },
  {
    id: "Profile_Hacking",
    options: [
      {
        value: "Identity Theft",
        label: "Identity Theft",
        trigger: "Date_module",
      },
      {
        value: "Fake Profile",
        label: "Fake Profile",
        trigger: "Date_module",
      },
      {
        value: "Cheating by Impersonation",
        label: "Cheating by Impersonation",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Cat-231",
    message: "Select type of Hacking in Computer",
    trigger: "Computer",
  },
  {
    id: "Computer",
    options: [
      {
        value: "Damage to computer",
        label: "Damage to computer",
        trigger: "Date_module",
      },
      {
        value: "Data Breach",
        label: "Data Breach",
        trigger: "Date_module",
      },
      {
        value: "Altered Computer program",
        label: "Altered Computer program",
        trigger: "Date_module",
      },
      {
        value: "ransomware",
        label: "ransomware",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Cat-24",
    message: "Select other Online Crime:",
    trigger: "Other",
  },
  {
    id: "Other",
    options: [
      {
        value: "Online Anti National/Communal Hatred/Terror Activity",
        label: "Online Anti National/Communal Hatred/Terror Activityr",
        trigger: "Date_module",
      },
      {
        value: "online prostitution/Human Trafficking",
        label: "online prostitution/Human Trafficking",
        trigger: "Date_module",
      },
      {
        value: "online Gambling",
        label: "online Gambling",
        trigger: "Date_module",
      },
      {
        value: "other",
        label: "other",
        trigger: "Date_module",
      },
    ],
  },
  {
    id: "Date_module",
    message: "Select the Date of happened?:",
    trigger: "Select_date",
  },
  {
    id: "Select_date",
    component: <Datepic />,
    waitAction: true,
  },
  {
    id: "Delay",
    message: "Explain why there is Delay in register:",
    trigger: "Delay_exp",
  },
  {
    id: "Delay_exp",
    user: true,
    trigger: "incident_area",
  },
  {
    id: "incident_area",
    message: "Select State and District:",
    trigger: "incident_menu",
  },
  {
    id: "incident_menu",
    component: <Sdrop />,
    waitAction: true,
  },
  {
    id: "explanation",
    message: "Explain the Incident in your own Words",
    trigger: "desc",
  },
  {
    id: "desc",
    user: true,
    trigger: "Location",
  },
  {
    id: "Location",
    message: "Do you want to give Location Details: ",
    trigger: "Loc",
  },
  {
    id: "Loc",
    options: [
      {
        value: "Yes",
        label: "Yes",
        trigger: "Loc_Details",
      },
      {
        value: "No",
        label: "No",
        trigger: "update",
      },
    ],
  },
  {
    id: "Loc_Details",
    component: <Popmain />,
    waitAction: true,
  },
  {
    id: "update",
    message: "Do you want to add any attachments",
    trigger: "Attachments",
  },
  {
    id: "Attachments",
    options: [
      {
        value: "Yes",
        label: "Yes",
        trigger: "Upload",
      },
      {
        value: "No",
        label: "No",
        trigger: "Reference",
      },
    ],
  },
  {
    id: "Upload",
    component: <Upload />,
    waitAction: true,
  },
  {
    id: "Reference",
    component: <Review />,
    end: true,
  },
];

export default STEPS;
