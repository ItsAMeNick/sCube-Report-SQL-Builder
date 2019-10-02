var accela_data = {
    "Permit Information": {
        table_name: "B1PERMIT",
        shortname: "b1",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "Record ID": {
                table_key: "B1_ALT_ID",
                name: "Record_ID"
            },
            "ID1": {
                table_key: "B1_PER_ID1",
                name: "ID1"
            },
            "ID2": {
                table_key: "B1_PER_ID2",
                name: "ID2"
            },
            "ID3": {
                table_key: "B1_PER_ID3",
                name: "ID3"
            },
            "Module": {
                table_key: "B1_PER_Group",
                name: "Record_Module"
            },
            "Type": {
                table_key: "B1_PER_TYPE",
                name: "Record_Type"
            },
            "Subtype": {
                table_key: "B1_PER_SUB_TYPE",
                name: "Record_Subtype"
            },
            "Category": {
                table_key: "B1_PER_CATEGORY",
                name: "Record_Category"
            },
            "Service Provider Code": {
                table_key: "SERV_PROV_CODE",
                name: "SVP"
            },
            "Application Status": {
                table_key: "B1_APPL_STATUS",
                name: "Status"
            },
            "Application Status Date": {
                table_key: "B1_APPL_STATUS_DATE",
                name: "Status_Date"
            },
            "Record Created Date": {
                table_key: "B1_FILE_DD",
                name: "Record_Created_Date"
            },
            "Record Name": {
                table_key: "B1_SPECIAL_TEXT",
                name: "Record_Name"
            }
        }
    },
    "Address Information": {
        table_name: "B3ADDRES",
        shortname: "addres",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "Street Number": {
                table_key: "B1_HSE_NBR_START",
                name: "Street_Number"
            },
            "Street Direction": {
                table_key: "B1_STR_DIR",
                name: "Street_Direction"
            },
            "Street Name": {
                table_key: "B1_STR_NAME",
                name: "Street_Name"
            },
            "Street Type": {
                table_key: "B1_STR_SUFFIX",
                name: "Street_Type"
            },
            "Unit Number": {
                table_key: "B1_UNIT_START",
                name: "Unit_Number"
            },
            "Unit Type": {
                table_key: "B1_UNIT_TYPE",
                name: "Unit_Type"
            },"City": {
                table_key: "B1_SITUS_CITY",
                name: "CSZ_City"
            },
            "State": {
                table_key: "B1_SITUS_STATE",
                name: "CSZ_State"
            },
            "Zip": {
                table_key: "B1_SITUS_ZIP",
                name: "CSZ_Zip"
            }
        }
    },
    "Current Workflow Information": {
        table_name: "GPROCESS",
        shortname: "workflow",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "Current Workflow Task": {
                table_key: "SD_PRO_DES",
                name: "WF_Task"
            },
            "Current Workflow Status": {
                table_key: "SD_APP_DES",
                name: "WF_Status"
            },
            "Current Workflow Assigned Date": {
                table_key: "G6_ASGN_DD",
                name: "WF_Assigned_Date"
            },
            "Current Workflow Status Date": {
                table_key: "G6_STAT_DD",
                name: "WF_Status_Date"
            },
            "Current Workflow Task Due Date": {
                table_key: "B1_DUE_DD",
                name: "WF_Due_Date"
            }
        }
    },
    "Payment Information": {
        table_name: "F4PAYMENT",
        shortname: "payment",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "Receipt Number": {
                table_key: "RECEIPT_NBR",
                name: "Receipt_NBR"
            },
            "Payment Date": {
                table_key: "PAYMENT_DATE",
                name: "payment_Date"
            },
            "Payment Amount": {
                table_key: "PAYMENT_AMOUNT",
                name: "Payment_Amount"
            },
            "Payment Status": {
                table_key: "PAYMENT_STATUS",
                name: "payment_Status"
            },
            "Transaction Number": {
                table_key: "TRANSACTION_NBR",
                name: "transaction_NBR"
            }
        }
    },
    "Owner Information": {
        table_name: "B3OWNERS",
        shortname: "OWNER",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "First Name": {
                table_key: "B1_OWNER_FNAME",
                name: "O_First_Name"
            },
            "Middle Name": {
                table_key: "B1_OWNER_MNAME",
                name: "O_Middle_Name"
            },
            "Last Name": {
                table_key: "B1_OWNER_LNAME",
                name: "O_Last_Name"
            },
            "Owner Address 1": {
                table_key: "B1_ADDRESS1",
                name: "O_Address1"
            },
            "Owner Address 2": {
                table_key: "B1_ADDRESS2",
                name: "O_Address2"
            },
            "Owner Address 3": {
                table_key: "B1_ADDRESS3",
                name: "O_Address3"
            },
            "Owner City": {
                table_key: "B1_CITY",
                name: "O_City"
            },
            "Owner State": {
                table_key: "B1_STATE",
                name: "O_State"
            },
            "Owner Zip": {
                table_key: "B1_ZIP",
                name: "O_Zip"
            },
            "Owner Country": {
                table_key: "B1_COUNTRY",
                name: "O_Country"
            },
            "Owner Mailing Address 1": {
                table_key: "B1_MAIL_ADDRESS1",
                name: "OM_Address1"
            },
            "Owner Mailing Address 2": {
                table_key: "B1_MAIL_ADDRESS2",
                name: "OM_Address2"
            },
            "Owner Mailing Address 3": {
                table_key: "B1_MAIL_ADDRESS3",
                name: "OM_Address3"
            },
            "Owner Mailing City": {
                table_key: "B1_MAIL_CITY",
                name: "OM_City"
            },
            "Owner Mailing State": {
                table_key: "B1_MAIL_STATE",
                name: "OM_State"
            },
            "Owner Mailing Zip": {
                table_key: "B1_MAIL_ZIP",
                name: "OM_Zip"
            },
            "Owner Mailing Country": {
                table_key: "B1_MAIL_COUNTRY",
                name: "OM_Country"
            },
            "Owner Phone": {
                table_key: "B1_PHONE",
                name: "O_Phone1"
            },
            "Owner Email": {
                table_key: "B1_EMAIL",
                name: "O_Email"
            },
        }
    },
    "Parcel Information": {
        table_name: "B3PARCEL",
        shortname: "parcel",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "ID": {
                table_key: "B1_PARCEL_NBR",
                name: "Parcel_ID"
            },
            "Lot": {
                table_key: "B1_LOT",
                name: "Parcel_Lot"
            },
            "Block": {
                table_key: "B1_BLOCK",
                name: "Parcel_Block"
            },
            "Subdivision": {
                table_key: "B1_SUBDIVISION",
                name: "Parcel_Subdivision"
            }
        }
    },
    "Expiration Information": {
        table_name: "B1EXPIRATION",
        shortname: "expInfo",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "Expiration Status": {
                table_key: "EXPIRATION_STATUS",
                name: "Expiration_Status"
            },
            "Expiration Date": {
                table_key: "EXPIRATION_DATE",
                name: "EXPIRATION_DATE"
            },
        }
    },
    "ASI Field": {
        table_name: "BCHCKBOX",
        shortname: "asi",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: {
            "ASI Field Name": {
                table_key: "B1_CHECKBOX_DESC",
                name: "ASI_Field"
            }
        },
        data: {
            "ASI Field Value": {
                table_key: "B1_CHECKLIST_COMMENT",
                name: "ASI_Value"
            }
        }
    },
    "Contact Information": {
        table_name: "B3CONTACT",
        shortname: "contact",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: {
            "Contact Type": {
                table_key: "B1_CONTACT_TYPE",
                name: "Contact_Type"
            }
        },
        data: {
            "First Name": {
                table_key: "B1_FNAME",
                name: "First_Name"
            },
            "Middle Name": {
                table_key: "B1_MNAME",
                name: "Middle_Name"
            },
            "Last Name": {
                table_key: "B1_LNAME",
                name: "Last_Name"
            },
            "Business Name": {
                table_key: "B1_BUSINESS_NAME",
                name: "Contact_Business_Name"
            },
            "Contact Address 1": {
                table_key: "B1_ADDRESS1",
                name: "Contact_Address1"
            },
            "Contact Address 2": {
                table_key: "B1_ADDRESS2",
                name: "Contact_Address2"
            },
            "Contact Address 3": {
                table_key: "B1_ADDRESS3",
                name: "Contact_Address3"
            },
            "Contact City": {
                table_key: "B1_CITY",
                name: "Contact_City"
            },
            "Contact State": {
                table_key: "B1_STATE",
                name: "Contact_State"
            },
            "Contact Zip": {
                table_key: "B1_ZIP",
                name: "Contact_Zip"
            },
            "Contact Country": {
                table_key: "B1_COUNTRY",
                name: "Contact_Country"
            },
            "Contact Phone 1": {
                table_key: "B1_PHONE1",
                name: "Contact_Phone1"
            },
            "Contact Phone 2": {
                table_key: "B1_PHONE2",
                name: "Contact_Phone2"
            },
            "Contact Email": {
                table_key: "B1_EMAIL",
                name: "Contact_Email"
            },
            "Contact Trade Name": {
                table_key: "B1_TRADE_NAME",
                name: "Contact_Trade_Name"
            }
        }
    },
    "Professional Information": {
        table_name: "B3CONTRA",
        shortname: "professional",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: {
            "LICENSED PROFESSIONAL TYPE": {
                table_key: "B1_LICENSE_TYPE",
                name: "License_Type"
            }
        },
        data: {
            "First Name": {
                table_key: "B1_CAE_FNAME",
                name: "First_Name"
            },
            "Middle Name": {
                table_key: "B1_CAE_MNAME",
                name: "Middle_Name"
            },
            "Last Name": {
                table_key: "B1_CAE_LNAME",
                name: "Last_Name"
            },
            "Business Name": {
                table_key: "B1_BUS_NAME",
                name: "Professional_Business_Name"
            },
            "Professional Address 1": {
                table_key: "B1_ADDRESS1",
                name: "Professional_Address1"
            },
            "Professional Address 2": {
                table_key: "B1_ADDRESS2",
                name: "Professional_Address2"
            },
            "Professional Address 3": {
                table_key: "B1_ADDRESS3",
                name: "Professional_Address3"
            },
            "Professional City": {
                table_key: "B1_CITY",
                name: "Professional_City"
            },
            "Professional State": {
                table_key: "B1_STATE",
                name: "Professional_State"
            },
            "Professional Zip": {
                table_key: "B1_ZIP",
                name: "Professional_Zip"
            },
            "Professional Country": {
                table_key: "B1_COUNTRY",
                name: "Professional_Country"
            },
            "Professional Phone 1": {
                table_key: "B1_PHONE1",
                name: "Professional_Phone1"
            },
            "Professional Phone 2": {
                table_key: "B1_PHONE2",
                name: "Professional_Phone2"
            },
            "Professional Email": {
                table_key: "B1_EMAIL",
                name: "Professional_Email"
            },
            "Professional License Number": {
                table_key: "B1_LICENSE_NBR",
                name: "Prof_License_Num"
            }
        }
    },
    "Standard Choice": {
        table_name: "RBIZDOMAIN_VALUE",
        shortname: "std",
        parent: null,
        join_clause: ["SERV_PROV_CODE"],
        required: {
            "STDC Group": {
                table_key: "BIZDOMAIN",
                name: "Choice Group"
            },
            "STDC Field": {
                table_key: "BIZDOMAIN_VALUE",
                name: "STD Choice"
            }
        },
        data: {
            "Value": {
                table_key: "VALUE_DESC",
                name: "STD_Value"
            }
        }
    },
    "Fee": {
        table_name: "F4FEEITEM",
        shortname: "fee",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: {
            "Fee Item": {
                table_key: "GF_COD",
                name: "Fee_Code"
            }
        },
        data: {
            "Description": {
                table_key: "GF_DES",
                name: "Fee_Description"
            },
            "Schedule": {
                table_key: "GF_FEE_SCHEDULE",
                name: "Fee_Schedule"
            },
            "Value": {
                table_key: "GF_FEE",
                name: "Fee_Val"
            },
            "Status": {
                table_key: "GF_ITEM_STATUS_FLAG",
                name: "Fee_Status"
            }
        }
    },
}

export default {accela_data};
