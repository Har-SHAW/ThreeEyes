import React, { Component } from "react";
import Upload from "./imageComponent";
import Popmain from "./popmain";
import Sdrop from "./searchdrop";
import Datepic from "./Datepic";
import PhoneVerify from "./phoneverify";
import { firebase } from "./firebase";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TrackComp from "./searchStatus";
import AddressInput from "./inputAddressComponent";
import Cards from './cardComponent';
import Safe from '../SafetyComponents/safeComponent';
import Example from "./platformComponent";

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
      stateDist: [],
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    console.log(steps);
    if ("") console.log("Yes it is present");
    this.state.cl.push("" + steps.Select_date.value + "");
    this.state.cl.push(steps.Delay_exp.value);
    this.state.cl.push(steps.desc.value);
    var i;
    for(i=0;i<steps.ch_plat.value.platform.length;i++){
      this.state.cl.push(steps.ch_plat.value.platform[i].value);
    }
    this.state.stateDist.push(steps.incident_menu.value.state);
    this.state.stateDist.push(steps.incident_menu.value.district);
    this.state.stateDist.push(steps.incident_menu.value.psregion);
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
      this.state.location.push(steps.Loc_Input.value);
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
    console.log({
      Attachments: this.state.attachments,
      created: "" + Date().toString() + "",
      Description: this.state.cl,
      DoneBy: this.state.doneBy,
      Location: this.state.location,
      Place: this.state.stateDist,
      Status: "Pending",
      Remarks: "None",
    });
    const db = firebase.firestore();
    db.collection("Issues")
      .add({
        Attachments: this.state.attachments,
        created: "" + Date().toString() + "",
        Description: this.state.cl,
        DoneBy: this.state.doneBy,
        Location: this.state.location,
        Place: this.state.stateDist,
        Status: "Pending",
        Remarks: "None",
      })
      .then((data) => {
        console.log(data.id);
        this.setState({
          docId: data.id,
        });
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
            <p>Your Document id is: </p>
            <strong
              style={{
                margin: "5px",
                color: "green",
                border: "1px dashed black",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {this.state.docId}
            </strong>
          </div>
        </div>
        <div style={{height: "10px"}}/>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {this.state.docId !== "Loading please wait ..." ? (
            <CopyToClipboard
              text={this.state.docId}
              onCopy={() => this.setState({ status: "Copied!" })}
            >
              <button className="button1">Copy id to clipboard</button>
            </CopyToClipboard>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          {this.state.status !== "" ? (
            <span style={{ color: "green", fontWeight: "bold" }}>
              {this.state.status}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

const STEPS = [
  {
    id: "Greetings",
    message: "Namaste, I am CyberDost! I am here to assist you regarding Cyber Crime Complaints",
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
        trigger: "Safe",
      },
      {
        value: "Track",
        label: "Track the Complaint",
        trigger: "TrackComplaint",
      },
    ],
  },
  {
    id: "TrackComplaint",
    component: <TrackComp />,
    end: true,
  },
  {
    id: "Report",
    message: "Select the Type Of Category from the Below List: ",
    trigger: "Category",
  },
  /* 
  {
    id: "On-Chat",
    message: "Select Type of Crime:",
    trigger: "Category",
  }, */
  {
    id: "Category",
    options: [
      {
        value: "Child Sex Abuse/Rape/Obstacenity",
        label: "Child Sex Abuse/Rape/Obstacenity",
        trigger: "Categoty_CRSO",
      },
      {
        value: "Cyber Crime",
        label: "Cyber Crime",
        trigger: "Cyber_type",
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
        trigger: "Register-Types",
      },
      {
        value: "Rape/Gang Rape",
        label: "Rape/Gang Rape",
        trigger: "Register-Types",
      },
      {
        value: "Sexual Obscenity",
        label: "Sexual Obscenity",
        trigger: "Register-Types",
      },
      {
        value: "Sexually Explicit",
        label: "Sexually Explicit",
        trigger: "Register-Types",
      },
    ],
  },
  {
	id: "Register-Types",
	message: 'Select the Services u want: ',
	trigger: 'reg_op',
  },
  {
	id: 'reg_op',
    options: [
      {
        value: "Here",
        label: "On-Chat Register Complaint",
        trigger: "comp",
      },
      {
        value: "Information",
        label: "Information",
        trigger: "Modal_1",
      },
    ],
  },
  {
	  id: 'comp',
	  message: 'Select How u want to Register:',
	  trigger: 'Complaint_type'
  },
  {
    id: "Complaint_type",
    options: [
      {
        value: "Anonymous",
        label: "Anonymous",
        trigger: "Date_module",
      },
      {
        value: "Personal",
        label: "Personal",
        trigger: "Authentication",
      },
    ],
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
        trigger: "reg_type",
      },
      {
        value: "Unauthorized Access Through Internet Banking",
        label: "Unauthorized Access Through Internet Banking",
        trigger: "reg_type",
      },
      {
        value: "Cryptocurrency/Bitcoin",
        label: "Cryptocurrency/Bitcoin",
        trigger: "reg_type",
      },
      {
        value: "E-Wallet Fraud,Demat/Mutual Fund",
        label: "E-Wallet Fraud,Demat/Mutual Fund",
        trigger: "reg_type",
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
        trigger: "reg_type",
      },
      {
        value: "Online Matrimonial Fraud",
        label: "Online Matrimonial Fraud",
        trigger: "reg_type",
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
        trigger: "reg_type",
      },
      {
        value: "Business Email",
        label: "Business Email",
        trigger: "reg_type",
      },
      {
        value: "Compromise",
        label: "Compromise",
        trigger: "reg_type",
      },
      {
        value: "Email Hacking",
        label: "Email Hacking",
        trigger: "reg_type",
      },
      {
        value: "Threatening Email",
        label: "Threatening Email",
        trigger: "reg_type",
      },
      {
        value: "Phishing Email",
        label: "Phishing Email",
        trigger: "reg_type",
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
        trigger: "reg_type",
      },
      {
        value: "Online Bulying/Stalking",
        label: "Online Bulying/Stalking",
        trigger: "reg_type",
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
        trigger: "reg_type",
      },
      {
        value: "Fake Profile",
        label: "Fake Profile",
        trigger: "reg_type",
      },
      {
        value: "Cheating by Impersonation",
        label: "Cheating by Impersonation",
        trigger: "reg_type",
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
        trigger: "reg_type",
      },
      {
        value: "Data Breach",
        label: "Data Breach",
        trigger: "reg_type",
      },
      {
        value: "Altered Computer program",
        label: "Altered Computer program",
        trigger: "reg_type",
      },
      {
        value: "ransomware",
        label: "ransomware",
        trigger: "reg_type",
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
        trigger: "reg_type",
      },
      {
        value: "online prostitution/Human Trafficking",
        label: "online prostitution/Human Trafficking",
        trigger: "reg_type",
      },
      {
        value: "online Gambling",
        label: "online Gambling",
        trigger: "reg_type",
      },
      {
        value: "other",
        label: "other",
        trigger: "reg_type",
      },
    ],
  },
  {
	  id: 'reg_type',
	  message: 'select the Service You want :',
	  trigger: 'process',
  },
  {
	  id: 'process',
	  options: [
		  {
			  label: 'On-Chat Register Complaint',
			  value: 'oc',
			  trigger: 'Authentication',
		  },
		  {
			  label: 'Information',
			  value:'in',
			  trigger: 'Modal_1'
		  },
	  ],
  },



/* Authentication Module */


  {
    id: "Authentication",
    message: "Enter Your Mobile Number?",
    trigger: "otp",
  },
  {
    id: "otp",
    component: <PhoneVerify />,
    waitAction: true,
  },

  {
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
    trigger: "Date_module",
  },


/* Authentication Module Ends */




/* Date Module Begins  */
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
    trigger: "plat",
  },
  {
	id: 'plat',
	message: 'Choose Platform if u say in Online:',
	trigger: 'ch_plat',
  },
  {
	id: 'ch_plat',
	component: <Example />,
	waitAction: true,
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
        trigger: "mapOrCustom",
      },
      {
        value: "No",
        label: "No",
        trigger: "update",
      },
    ],
  },
  {
    id: "mapOrCustom",
    message: "Select a method",
    trigger: "mapOrCustomOptions",
  },
  {
    id: "mapOrCustomOptions",
    options: [
      {
        value: "Select location on map",
        label: "Select location on map",
        trigger: "Loc_Details",
      },
      {
        value: "Enter address manually",
        label: "Enter address manually",
        trigger: "Loc_Input",
      },
    ],
  },
  {
    id: "Loc_Details",
    component: <Popmain />,
    waitAction: true,
  },
  {
    id: "Loc_Input",
    component: <AddressInput />,
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
	/* Card Component */
	{
		id: 'Modal_1',
		component: <Cards />,
		end: true,
	},

	/* Modal */
	{
		id: 'Safe',
		component: <Safe />,
		end: true,
	},

];




export default STEPS;