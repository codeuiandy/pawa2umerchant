import React, { useContext, useState, useEffect } from "react";
import "../dashboard/dashboard.scss";
import {
  DashboardIcon1,
  DashboardIcon2,
  DashboardIcon3,
} from "../../../assets/images/svgs";
import { UserDataContext } from "../../../context/userContext";
import {
  Backdrop,
  capitalize,
  Fade,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import Table from "./table";
import ClearIcon from "@material-ui/icons/Clear";
import "./wallet.css";
import { httpGetMain, httpPostMain } from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hideLoader, showLoader } from "../../helpers/loader";
import swal from "sweetalert";
import { dateFormater } from "../../helpers/dateFormater";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    border: "none",
    width: "450px",
    borderRadius: "4px",
  },
}));

const AgentDashboard = () => {
  const { user, loadingUser } = useContext(UserDataContext);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [wallet, setWallet] = useState({});
  const [banks, setbanks] = useState([]);
  const [transations, setTransactions] = useState([]);
  const [Stransations, setSTransactions] = useState({});
  const [settlement, setSettlement] = useState({
    walletId: "",
    amount: "",
    reference: "",
    bank: "",
    date: new Date(),
  });
  useEffect(() => {
    getWallet();
  }, []);

  const getWallet = async () => {
    let res = await httpGetMain(`merchant/wallet`);
    if (res) {
      if (res.er) {
        return NotificationManager.error(res.er.message);
      }

      setWallet(res.data.wallet);
      getTransaction(res.data.wallet.id);
      getBanks();
    }
  };

  const getTransaction = async (id) => {
    showLoader();
    let res = await httpGetMain(`merchant/wallet_history/${id}`);
    if (res) {
      hideLoader();
      if (res.er) {
        return NotificationManager.error(res.er.message);
      }
      setTransactions(res.data.histories);
    }
  };

  const getBanks = async () => {
    let res = await httpGetMain(`banks`);
    if (res) {
      if (res.er) {
        return NotificationManager.error(res.er.message);
      }
      setbanks(res.data.bankList);
      console.log(res.data.bankList);
    }
  };

  const submitSettlement = async () => {
    const setWalletId = settlement;
    setWalletId["wallet"] = wallet.id;

    // if (settlement.walletId == "") {
    //   return NotificationManager.warning("Wallet ID not found");
    // }

    if (settlement.amount == "") {
      return NotificationManager.warning("Amount is required");
    }

    if (settlement.reference == "") {
      return NotificationManager.warning("Reference is required");
    }

    if (settlement.bank == "") {
      return NotificationManager.warning("Bank is required");
    }

    if (settlement.date == "") {
      return NotificationManager.warning("Date is required");
    }

    const data = {
      walletId: wallet.id,
      amount: settlement.amount,
      reference: settlement.reference,
      bank: settlement.bank,
      date: settlement.date,
    };
    showLoader();
    let res = await httpPostMain(`merchant/pending_settlement`, data);

    if (res) {
      hideLoader();
      if (res.er) {
        return NotificationManager.error(res.er.message);
      }
      swal({
        title: "Success",
        text: "Settlement created successfully.",
        icon: "success",
      });
      getTransaction(res.data.pendingSettlement.walletId);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const toggleModal2 = () => {
    setOpenModal2(!openModal2);
  };

  const toggleModal3 = () => {
    setOpenModal3(!openModal3);
  };

  const singleTransationDetails = (data) => {
    setSTransactions(data);
    console.log(data);
    toggleModal3();
  };

  return (
    <>
      <div>
        {loadingUser ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
            <ClipLoader color="blue" loading={loadingUser} size={40} />
          </div>
        ) : (
          <div className="dashboard">
            <div className="charts">
              <Table
                transations={transations}
                singleTransationDetails={singleTransationDetails}
              />
            </div>
            <div className="side-bar">
              {/* <TotalCard title="Total Tickets" value={57} color={"#662D91"} />
          <TotalCard title="Assigned Tickets" value={57} color={"#51B74F"} />
          <TotalCard title="Overdue Tickets" value={50} color={"#F40D0D"} /> */}
              {/* sidebar progress bars */}
              <div className="progress-bars">
                <div className="top-section">
                  <h3
                    style={{
                      borderBottom: "1px solid #EDF2F7",
                      paddingBottom: "20px",
                      fontSize: "14px",
                    }}
                  >
                    Credit Balance
                  </h3>
                  <div className="dashboardBalance">
                    <h2>{`${wallet?.currency} ${wallet?.balAmount}`}</h2>
                    <button
                      style={{ marginTop: "30px" }}
                      onClick={toggleModal2}
                    >
                      Settle Pawa2u
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "60px",
                  background: "white",
                  borderRadius: "3px",
                  border: "1px solid #A0AEC0",
                  marginTop: "10px",
                  paddingLeft: "20px",
                  paddingTop: "20px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={toggleModal}
                className="settlePaw2u"
              >
                <p>Submit settlement details</p>
              </div>
            </div>
          </div>
        )}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={toggleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          className={classes.modal}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              <div className="modalHeader">
                <p>Submit settlement</p>
                <div
                  className="closeIconModal"
                  style={{ cursor: "pointer" }}
                  onClick={toggleModal}
                >
                  <ClearIcon />
                </div>
              </div>

              <div className="settlementForm">
                <div className="inputWrapWa">
                  <label htmlFor="">Amount</label>
                  <input
                    type="text"
                    onChange={({ target }) =>
                      setSettlement({
                        ...settlement,
                        amount: target.value,
                      })
                    }
                    value={settlement.amount}
                  />
                </div>

                <div className="inputWrapWa">
                  <label htmlFor="">Reference ID</label>
                  <input
                    type="text"
                    onChange={({ target }) =>
                      setSettlement({
                        ...settlement,
                        reference: target.value,
                      })
                    }
                    value={settlement.reference}
                  />
                </div>

                <div className="inputWrapWa">
                  <label htmlFor="">Bank</label>
                  <select
                    type="text"
                    onChange={({ target }) =>
                      setSettlement({
                        ...settlement,
                        bank: target.value,
                      })
                    }
                    value={settlement.bank}
                  >
                    <option value="">Select bank</option>
                    {banks.map((data) => {
                      return <option>{data.name}</option>;
                    })}
                  </select>
                </div>

                <div className="inputWrapWa">
                  <label htmlFor="">Date paid</label>
                  <DatePicker
                    selected={settlement.date}
                    onChange={(date) =>
                      setSettlement({ ...settlement, date: date })
                    }
                  />
                </div>

                <div className="submitDataSe">
                  <button onClick={submitSettlement}>Submit settlement</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal2}
          onClose={toggleModal2}
          closeAfterTransition
          BackdropComponent={Backdrop}
          className={classes.modal}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal2}>
            <div className={classes.paper}>
              <div className="modalHeader">
                <p>Bank Details</p>
                <div
                  className="closeIconModal"
                  style={{ cursor: "pointer" }}
                  onClick={toggleModal2}
                >
                  <ClearIcon />
                </div>
              </div>

              <div className="settlementForm">
                <div className="settlePaw2uM">
                  <p>RHM LIMITED</p>
                  <h2>0108982564</h2>
                  <p>GTBANK</p>
                </div>
                <div className="submitDataSe">
                  <button onClick={toggleModal2}>Done</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal3}
          onClose={toggleModal3}
          closeAfterTransition
          BackdropComponent={Backdrop}
          className={classes.modal}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal3}>
            <div className={classes.paper}>
              <div className="modalHeader" style={{ borderBottom: "none" }}>
                <p></p>
                <div
                  className="closeIconModal"
                  style={{ cursor: "pointer" }}
                  onClick={toggleModal3}
                >
                  <ClearIcon />
                </div>
              </div>

              <div className="settlementForm">
                <div className="singleTransM">
                  <div className="singleTransHeader">
                    <p>Settlement details</p>
                    <h2>NGN {Stransations?.amount}</h2>
                  </div>
                </div>

                <div className="singSdetail">
                  <p>Reference ID</p>
                  <p>{Stransations?.reference}</p>
                </div>

                <div className="singSdetail">
                  <p>Amount</p>
                  <p>{Stransations?.amount}</p>
                </div>

                <div className="singSdetail">
                  <p>Merchant name</p>
                  <p>{`${Stransations?.firstName} ${Stransations?.lastName}`}</p>
                </div>

                <div className="singSdetail">
                  <p>Date</p>
                  <p>{dateFormater(Stransations?.createdAt)}</p>
                </div>

                <div className="submitDataSe">
                  <button onClick={toggleModal3}>Done</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default AgentDashboard;
