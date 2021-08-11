import React, { useState, useEffect, useContext } from "react";
import "./conversation.css";
import { Modal } from "react-responsive-modal";
import MessageList from "./messageList";
import searchIcon from "../../../assets/imgF/Search.png";
import NoChatFound from "./noChatFound";
import SingleChatOpen from "./sigleChat";
import {
  httpGetMain,
  httpPostMain,
  httpPatchMain,
} from "../../../helpers/httpMethods";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { NotificationManager } from "react-notifications";
import ClipLoader from "react-spinners/ClipLoader";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import BackArrow from "../../../assets/imgF/back.png";
import editorImg from "../../../assets/imgF/editorImg.png";
import Smiley from "../../../assets/imgF/Smiley.png";
import boldB from "../../../assets/imgF/boldB.png";
import TextItalic from "../../../assets/imgF/TextItalic.png";
import TextUnderline from "../../../assets/imgF/TextUnderline.png";
import TextAlignLeft from "../../../assets/imgF/TextAlignLeft.png";
import TextAlignCenter from "../../../assets/imgF/TextAlignCenter.png";
import TextAlignRight from "../../../assets/imgF/TextAlignRight.png";
import UserProfile from "./userProfile";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import { SocketDataContext } from "../../../context/socket";
import {
  StarIconTicket,
  SendMsgIcon,
  ExpandChat,
} from "../../../assets/images/svgs";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import { dateFormater } from "../../helpers/dateFormater";
import { capitalize } from "@material-ui/core";
import moment from "moment";

export default function Conversation() {
  const initialState = EditorState.createWithContent(
    ContentState.createFromText("")
  );
  const [userMsg, setUsermsg] = useState([
    {
      img: "",
      fullName: "",
      msg: "",
      date: "",
      msgCount: "",
      badge1: "",
    },
  ]);

  const {
    AppSocket,
    //wsTickets,
    setWsTicketFilter,
    wsTicketFilter,
    // setMsgHistory,
    // msgHistory,
  } = useContext(SocketDataContext);
  const [loadSelectedMsg, setloadSelectedMsg] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filterTicketsState, setFilterTicketsState] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [LoadingTick, setLoadingTicks] = useState(true);
  const [loadSingleTicket, setLoadSingleTicket] = useState(false);
  const [SenderInfo, setSenderInfo] = useState(false);
  const [singleTicketFullInfo, setTingleTicketFullInfo] = useState(false);
  const [Category, setCategory] = useState([]);
  const [editorState, setEditorState] = useState(initialState);
  const [firstTimeLoad, setfirstTimeLoad] = useState(true);
  const [MessageSenderId, setMessageSenderId] = useState("");
  const [TicketId, setTicketId] = useState("");
  const [showUserProfile, setshowUserProfile] = useState(false);
  const [ReplyTicket, setReplyTicket] = useState({
    plainText: "",
    richText: "",
  });
  const [Statues, setStatues] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [ChatCol, setChatCol] = useState({
    col1: "",
    col2: "",
  });
  const [openSaveTicketModal, setopenSaveTicketModal] = useState(false);
  const [filterChat, setFilterChat] = useState("system");
  const [saveTicket, setSaveTicket] = useState({
    customer: "",
    subject: "",
    description: [],
    category: "",
  });
  const [sendingReply, setsendingReply] = useState(false);
  const [msgHistory, setMsgHistory] = useState([]);
  const [wsTickets, setwsTickets] = useState([]);
  const [categoryUpdate, setCategoryUpdate] = useState("");
  const [noResponseFound, setNoResponseFound] = useState(true);
  const [TodayMsges, setTodayMsges] = useState([]);
  const [YesterdayMsges, setYesterdayMsges] = useState([]);
  const [AchiveMsges, setAchiveMsges] = useState([]);
  const [ShowAchive, setShowAchive] = useState(false);
  const [channel, setchannel] = useState("All");
  const [status, setstatus] = useState("All");
  useEffect(() => {
    // getTickets();
    sortMsges(msgHistory);
  }, [msgHistory]);

  useEffect(() => {
    getStatues();
    getCategories();
  }, []);
  useEffect(() => {
    AppSocket.createConnection();
    AppSocket.io.on(`ws_tickets`, (data) => {
      console.log("this are Ticketsss", data?.data?.tickets);
      setwsTickets(data?.data?.tickets);
    });
    AppSocket.io.on(`message`, (data) => {
      console.log("this are history msbsg", data);
      console.log(UserInfo);
      let msg = {
        created_at: data.created_at,
        id: data.history.id,
        plain_response: data.history.plain_response,
        response: data.history.response,
        type: "reply",
        user: data.user,
      };
      console.log("msg>>>", msg);

      setMsgHistory((item) => [...item, msg]);
      // sortMsges((item) => [...item, msg]);
    });
    return () => {
      AppSocket.io.disconnect();
    };
  }, []);

  const sortMsges = (msgs) => {
    console.log("msgHis", msgs);
    let Today = [];

    let resultToday = msgs.filter((observation) => {
      return (
        moment(observation.created_at).format("DD/MM/YYYY") ==
        moment(new Date()).format("DD/MM/YYYY")
      );
    });
    let resultYesterday = msgs.filter((observation) => {
      return (
        moment(observation.created_at).format("DD/MM/YYYY") ==
        moment().add(-1, "days").format("DD/MM/YYYY")
      );
    });

    let resultAchive = msgs.filter((observation) => {
      return (
        moment(observation.created_at).format("DD/MM/YYYY") !=
          moment().add(-1, "days").format("DD/MM/YYYY") &&
        moment(observation.created_at).format("DD/MM/YYYY") !=
          moment(new Date()).format("DD/MM/YYYY")
      );
    });
    setTodayMsges(resultToday);
    setYesterdayMsges(resultYesterday);
    setAchiveMsges(resultAchive);
    console.log("Today>>>", resultToday);
    console.log("Yesterdat msg ", resultYesterday);
    console.log("resultAchive msg ", resultAchive);
  };
  useEffect(() => {
    setLoadingTicks(true);
    setTickets(wsTickets);
    setLoadingTicks(false);
  }, [wsTickets]);

  const onEditorStateChange = (editorState) => {
    // handleDescriptionValidation(editorState);

    const plainText = editorState.getCurrentContent().getPlainText();
    const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    setReplyTicket({ plainText, richText });
    console.log(">>>>", richText, richText);
  };
  const getTickets = async () => {
    const res = await httpGetMain("tickets?channel=whatsapp");
    if (res?.status == "success") {
      setLoadingTicks(true);
      setTickets(res?.data?.tickets);
      setLoadingTicks(false);
    } else {
      setLoadingTicks(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const filterTicket = (value, type) => {
    if (type == "channel") {
      setchannel(value);
      AppSocket.createConnection();
      let data = { channel: value == "All" ? "" : value, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, data);
    }

    if (type == "status") {
      setstatus(value);
      AppSocket.createConnection();
      let data = { status: value == "All" ? "" : value, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, data);
    }
  };

  const replyTicket = async (reply, attachment) => {
    console.log(reply);
    const data = {
      // type: "note",
      response: reply.richText,
      plainResponse: reply.plainText,
      phoneNumber: singleTicketFullInfo.customer.phone_number,
      // attachment: "",
    };
    console.log(singleTicketFullInfo.customer.phone_number);
    console.log(data);
    // setsendingReply(true);
    const replyData = {
      attachment: null,
      created_at: new Date(),
      plain_response: reply.plainText,
      response: reply.richText,
      // user: SenderInfo?.customer,
      user: ticket[0]?.assignee,
    };
    console.log(replyData);
    setMsgHistory((item) => [...item, replyData]);
    const res = await httpPostMain(
      `tickets/${singleTicketFullInfo.id}/replies`,
      data
    );
    if (res?.status == "success") {
      // setsendingReply(false);
      // ReloadloadSingleMessage();
      setEditorState(initialState);
      setReplyTicket({ plainText: "", richText: "" });
    } else {
      // setLoadingTicks(false);
      setsendingReply(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const ReloadloadSingleMessage = async () => {
    setLoadSingleTicket(true);

    const res = await httpGetMain(`tickets/${MessageSenderId}`);
    if (res.status == "success") {
      setTicket(res?.data);
      setLoadSingleTicket(false);
    } else {
      setLoadSingleTicket(false);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const getStatues = async () => {
    const res = await httpGetMain(`statuses`);
    if (res.status == "success") {
      // getTickets();
      setStatues(res?.data?.statuses);
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const getCategories = async () => {
    const res = await httpGetMain(`categories`);
    if (res.status == "success") {
      setCategory(res?.data?.categories);
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const upTicketStatus = async (id) => {
    const data = { statusId: id };
    const res = await httpPatchMain(`tickets/${TicketId}`, data);
    if (res.status == "success") {
      // setStatues(res?.data?.statuses);
      return NotificationManager.success(
        "Ticket status update successfully",
        "Success",
        4000
      );
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const loadSingleMessage = async ({ id, customer, assignee, subject }) => {
    setShowAchive(false);
    setAchiveMsges([]);
    getUser(customer.id);
    setChatCol({ col1: "hideColOne", col2: "showColTwo" });
    setSenderInfo({ customer, subject });
    setMessageSenderId(id);
    setLoadSingleTicket(true);
    setTingleTicketFullInfo();
    setTicket([]);
    let swData = { assigneeId: assignee.id, userId: customer.id };
    UserInfo.id && AppSocket.io.leave(`${UserInfo.id}${assignee.id}`);
    AppSocket.io.emit("join_private", swData);
    const res = await httpGetMain(`tickets/${id}`);
    setfirstTimeLoad(false);
    if (res.status == "success") {
      setTicket(res?.data);
      setMsgHistory(res?.data[0]?.history);
      // sortMsges(res?.data[0]?.history);
      setMessageSenderId(res?.data[0]?.id);
      setSaveTicket({
        ...saveTicket,
        customer: "",
        subject: res?.data[0].subject,
        description: res?.data[0].history,
      });
      console.log(res?.data[0]?.history);
      setLoadSingleTicket(false);
      checkRes();
    } else {
      setLoadSingleTicket(false);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const getUser = async (id) => {
    const res = await httpGetMain(`users/${id}`);
    setfirstTimeLoad(false);
    if (res.status == "success") {
      setUserInfo(res.data);
    } else {
      setLoadSingleTicket(false);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const updateTicket = async (status) => {
    // if (categoryUpdate == "") {
    //   NotificationManager.error("You need to update category to continue!");
    // }
    if (status == "") {
      return;
    }

    let data = {
      statusId: status,
      priorityId: ticket[0].priority.id,
      assigneeId: ticket[0].assignee.id,
      categoryId: categoryUpdate,
    };
    console.log(data);
    const res = await httpPatchMain(`tickets/${ticket[0].id}`);
    // updateTicketBo(true)
    if (res.status == "success") {
      console.log(res);
      closeSaveTicketModal();
      NotificationManager.success(
        "Ticket status successfully updated",
        "Success"
      );
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const closeSaveTicketModal = () => {
    setopenSaveTicketModal(!openSaveTicketModal);
    setSaveTicket({
      customer: "",
      subject: "",
      description: [],
      category: "",
    });
  };

  function createMarkup(data) {
    return { __html: data };
  }
  const checkRes = () => {
    let a = ticket?.map((data) => {
      if (data.history.length === 0) {
        setNoResponseFound(true);
      } else {
        setNoResponseFound(false);
      }
    });
  };

  // const _uploadImageCallBack = (file) => {
  //   // long story short, every time we upload an image, we
  //   // need to save it to the state so we can get it's data
  //   // later when we decide what to do with it.

  //   // Make sure you have a uploadImages: [] as your default state
  //   let uploadedImages = uploadImgS;

  //   const imageObject = {
  //     file: file,
  //     localSrc: URL.createObjectURL(file),
  //   };

  //   setUploadIMGs(imageObject);

  //   uploadImgS(uploadedImages);

  //   // We need to return a promise with the image src
  //   // the img src we will use here will be what's needed
  //   // to preview it in the browser. This will be different than what
  //   // we will see in the index.md file we generate.
  //   return new Promise((resolve, reject) => {
  //     resolve({ data: { link: imageObject.localSrc } });
  //   });
  // };

  const _uploadImageCallBack = (file) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    let uploadedImages = [];

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    uploadedImages.push(imageObject);
    console.log(imageObject);

    //this.setState(uploadedImages: uploadedImages)

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  return (
    <React.Fragment>
      <div className="conversation-wrap codei-ui-andy-setDefaults">
        <div className="conversation-layout">
          {/* CHAT COL ONE */}
          <div className={`conversation-layout-col-one`}>
            <div className="message-toggles">
              <div className="messageType">
                <FormControl variant="outlined">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => {
                      filterTicket(e.target.value, "channel");
                    }}
                    label="Filter"
                    value={channel}
                  >
                    {/* <MenuItem value=""></MenuItem> */}
                    <MenuItem value="All" label="All">
                      All
                    </MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="whatsapp">Whatsapp</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="liveChat">Live Chat</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="messageOpenClose">
                <FormControl variant="outlined">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => {
                      filterTicket(e.target.value, "status");
                    }}
                    value={status}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {Statues?.map((data) => {
                      return <MenuItem value={data.id}>{data.status}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="search-chat-con">
              <form>
                <div className="hjdwc">
                  <input placeholder="Search" type="text" />
                  <div className="search-chat-searchIcon">
                    <img src={searchIcon} alt="" />
                  </div>
                </div>
              </form>
            </div>
            <MessageList
              tickets={tickets}
              LoadingTick={LoadingTick}
              loadSingleMessage={loadSingleMessage}
              setTingleTicketFullInfo={setTingleTicketFullInfo}
              setTicketId={setTicketId}
              filterChat={filterChat}
              filterTicketsState={filterTicketsState}
            />
          </div>

          {/* CHAT COL ONE END*/}

          {/* CHAT COL TWO */}

          <div
            className={`conversation-layout-col-two`}
            // style={showUserProfile ? { width: "calc(100% - 636px)" } : {}}
          >
            {firstTimeLoad ? (
              <NoChatFound value="Click on a ticket to get started" />
            ) : loadSingleTicket ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "50px",
                  width: "100%",
                }}
              >
                {" "}
                <ClipLoader
                  color="#0d4166"
                  loading={loadSingleTicket}
                  size={35}
                />
              </div>
            ) : (
              <div className="conversation-layout-col-two-chatCol">
                {" "}
                {/* CHAT HEADER BOX SECTION */}
                {/* {noResponseFound ? (
                <p
                  style={{
                    textAlign: "center",
                    paddingTop: "30px",
                    paddingBottom: "30px",
                    marginBottom: "auto",
                    marginTop: "auto",
                  }}
                >
                  {" "}
                  <NoChatFound value="No response found" />
                </p>
              ) : ( */}
                <React.Fragment>
                  <div className="conversationHeaderV2">
                    <div className="conversationHeaderMainV2">
                      <div className="custormChatHeaderInfo">
                        <div className="custormChatHeaderInfoData">
                          <h1>{ticket[0]?.subject}</h1>
                          <p>
                            {`${capitalize(
                              SenderInfo?.customer?.firstname
                            )} ${capitalize(
                              SenderInfo?.customer?.lastname
                            )} ${capitalize(SenderInfo?.customer?.email)}`}
                            <div className="custormChatHeaderDot"></div>{" "}
                            <span>{dateFormater(ticket[0]?.updated_at)}</span>
                          </p>
                        </div>
                        <div
                          className="custormChatHeaderInfoAction"
                          onClick={closeSaveTicketModal}
                        >
                          <StarIconTicket /> Update
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CHAT SECTION */}
                  <div className="conversationsMain">
                    <div className="chatDateHeader">
                      <div className="chatDateHeaderhr1"></div>
                      <div className="chatDateHeaderTitle">
                        <span>
                          {moment(ticket[0].created_at).format("DD/MM/YYYY") ==
                          moment(new Date()).format("DD/MM/YYYY")
                            ? "Today"
                            : moment(ticket[0].created_at).format(
                                "DD/MM/YYYY"
                              ) == moment().add(-1, "days").format("DD/MM/YYYY")
                            ? "Yesterday"
                            : moment(ticket[0].created_at).fromNow()}
                        </span>{" "}
                      </div>
                      <div className="chatDateHeaderhr2"></div>
                    </div>

                    <div className="customerTiketChat">
                      <div className="customerTImageHeader">
                        <div className="imgContainercth">
                          {SenderInfo?.customer?.avatar ? (
                            <img src={SenderInfo?.customer?.avatar} alt="" />
                          ) : (
                            <div className="singleChatSenderImg">
                              <p>{`${SenderInfo?.customer?.firstname?.slice(
                                0,
                                1
                              )} ${SenderInfo?.customer?.lastname?.slice(
                                0,
                                1
                              )}`}</p>
                            </div>
                          )}
                          <div className="custorActiveStateimgd"></div>
                        </div>
                      </div>
                      <div className="custormernameticket">
                        <p style={{ color: "#006298" }}>
                          {`${capitalize(
                            ticket[0]?.customer?.firstname
                          )} ${capitalize(ticket[0]?.customer?.lastname)}`}
                        </p>
                        <p>{`Via ${ticket[0].channel} . ${dateFormater(
                          ticket[0].created_at
                        )}`}</p>
                      </div>
                    </div>
                    <div className="msgbodyticketHeader">
                      {capitalize(ticket[0]?.description)}
                    </div>
                    <div className="msgAssingedToee3">
                      This message is assigned to{" "}
                      <span>
                        {" "}
                        {`${capitalize(
                          ticket[0]?.assignee?.firstname
                        )} ${capitalize(ticket[0]?.assignee?.lastname)}`}
                      </span>
                    </div>

                    <div
                      className="msgAssingedToee3"
                      style={{ paddingTop: "8px", marginBottom: "-6px" }}
                    >
                      <span>
                        {" "}
                        {`${capitalize(
                          ticket[0]?.assignee?.firstname
                        )} ${capitalize(ticket[0]?.assignee?.lastname)}`}
                      </span>{" "}
                      picked up this chat
                    </div>

                    <div className="msgAssingedToee3">
                      Ticket Status has been marked as{" "}
                      <span> {ticket[0].status.status}</span>
                    </div>

                    <div
                      className="achivemsagesSection"
                      onClick={() => setShowAchive(!ShowAchive)}
                    >
                      <ExpandChat />
                      {AchiveMsges.length == 0 &&
                      TodayMsges.length == 0 &&
                      YesterdayMsges.length == 0 ? (
                        <span> No response found ({AchiveMsges.length})</span>
                      ) : (
                        <span>
                          {" "}
                          {ShowAchive ? "Condense" : "Expand"} all conversation
                          ({AchiveMsges.length})
                        </span>
                      )}
                    </div>

                    <div
                      className={` ${
                        ShowAchive && AchiveMsges.length > 0
                          ? "showAchivesWrap"
                          : "hideAchivesWrap"
                      }`}
                    >
                      {AchiveMsges.map((data) => {
                        return (
                          <div className="msgRepliesSectionChattsdw">
                            <div className="customerTiketChat">
                              <div className="customerTImageHeader">
                                <div className="imgContainercth">
                                  {data?.user.avatar ? (
                                    <img src={data?.user.avatar} alt="" />
                                  ) : (
                                    <div className="singleChatSenderImg">
                                      <p>{`${data?.user?.firstname?.slice(
                                        0,
                                        1
                                      )} ${data?.user?.lastname?.slice(
                                        0,
                                        1
                                      )}`}</p>
                                    </div>
                                  )}
                                  <div className="custorActiveStateimgd"></div>
                                </div>
                              </div>
                              <div className="custormernameticket">
                                <p style={{ color: "#006298" }}>
                                  {`${capitalize(
                                    data?.user?.firstname
                                  )} ${capitalize(data?.user?.lastname)}`}
                                  <span style={{ color: "#656565" }}>
                                    {" "}
                                    replied
                                  </span>
                                </p>
                                <p>{dateFormater(data.created_at)}</p>
                              </div>
                            </div>

                            <div
                              className="msgbodyticketHeader"
                              dangerouslySetInnerHTML={createMarkup(
                                data?.response
                              )}
                            ></div>
                          </div>
                        );
                      })}
                    </div>

                    {YesterdayMsges.length == 0 ? (
                      ""
                    ) : (
                      <div className="chatDateHeader">
                        <div className="chatDateHeaderhr1"></div>
                        <div className="chatDateHeaderTitle">
                          <span>Yesterday</span>{" "}
                        </div>
                        <div className="chatDateHeaderhr2"></div>
                      </div>
                    )}

                    {YesterdayMsges.map((data) => {
                      return (
                        <div className="msgRepliesSectionChattsdw">
                          <div className="customerTiketChat">
                            <div className="customerTImageHeader">
                              <div className="imgContainercth">
                                {data?.user.avatar ? (
                                  <img src={data?.user.avatar} alt="" />
                                ) : (
                                  <div className="singleChatSenderImg">
                                    <p>{`${data?.user?.firstname?.slice(
                                      0,
                                      1
                                    )} ${data?.user?.lastname?.slice(
                                      0,
                                      1
                                    )}`}</p>
                                  </div>
                                )}
                                <div className="custorActiveStateimgd"></div>
                              </div>
                            </div>
                            <div className="custormernameticket">
                              <p style={{ color: "#006298" }}>
                                {`${capitalize(
                                  data?.user?.firstname
                                )} ${capitalize(data?.user?.lastname)}`}
                                <span style={{ color: "#656565" }}>
                                  {" "}
                                  replied
                                </span>
                              </p>
                              <p>{dateFormater(data.created_at)}</p>
                            </div>
                          </div>

                          <div
                            className="msgbodyticketHeader"
                            dangerouslySetInnerHTML={createMarkup(
                              data?.response
                            )}
                          ></div>
                        </div>
                      );
                    })}

                    {TodayMsges.length == 0 ? (
                      ""
                    ) : (
                      <div className="chatDateHeader">
                        <div className="chatDateHeaderhr1"></div>
                        <div className="chatDateHeaderTitle">
                          <span>Today</span>{" "}
                        </div>
                        <div className="chatDateHeaderhr2"></div>
                      </div>
                    )}

                    {TodayMsges.map((data) => {
                      return (
                        <div className="msgRepliesSectionChattsdw">
                          <div className="customerTiketChat">
                            <div className="customerTImageHeader">
                              <div className="imgContainercth">
                                {data?.user.avatar ? (
                                  <img src={data?.user.avatar} alt="" />
                                ) : (
                                  <div className="singleChatSenderImg">
                                    <p>{`${data?.user?.firstname?.slice(
                                      0,
                                      1
                                    )} ${data?.user?.lastname?.slice(
                                      0,
                                      1
                                    )}`}</p>
                                  </div>
                                )}
                                <div className="custorActiveStateimgd"></div>
                              </div>
                            </div>
                            <div className="custormernameticket">
                              <p style={{ color: "#006298" }}>
                                {`${capitalize(
                                  data?.user?.firstname
                                )} ${capitalize(data?.user?.lastname)}`}
                                <span style={{ color: "#656565" }}>
                                  {" "}
                                  replied
                                </span>
                              </p>
                              <p>{dateFormater(data.created_at)}</p>
                            </div>
                          </div>

                          <div
                            className="msgbodyticketHeader"
                            dangerouslySetInnerHTML={createMarkup(
                              data?.response
                            )}
                          ></div>
                        </div>
                      );
                    })}

                    {/* <div
                    className="msgRepliesSectionChattsdw"
                    style={{ marginTop: "10px" }}
                  >
                    <div className="customerTiketChat">
                      <div className="customerTImageHeader">
                        <div className="imgContainercth">
                          <img src={pic} alt="" />
                          <div className="custorActiveStateimgd"></div>
                        </div>
                      </div>
                      <div className="custormernameticket">
                        <p style={{ color: "#006298" }}>
                          Hammed Daudu{" "}
                          <span style={{ color: "#656565" }}>replied</span>
                        </p>
                        <p>Just now</p>
                      </div>
                    </div>

                    <div
                      className="msgbodyticketHeader"
                      style={{ color: "rgba(101, 101, 101, 0.7)" }}
                    >
                      is typing...
                    </div>
                  </div> */}
                  </div>
                </React.Fragment>
                {/* CHAT COMMENT BOX SECTION */}
                <div className="conversationCommentBox">
                  <div className="single-chat-ckeditor">
                    <div
                      className="showBackArrowOnMobile"
                      onClick={() =>
                        setChatCol({ col1: "showColOne", col2: "hideColTwo" })
                      }
                    >
                      <img src={BackArrow} alt="" />
                    </div>

                    <Editor
                      editorState={editorState}
                      toolbar={{
                        options: ["emoji", "inline", "textAlign", "image"],

                        inline: {
                          inDropdown: false,
                          className: undefined,
                          component: undefined,
                          dropdownClassName: undefined,
                          options: ["bold", "italic", "underline"],
                          bold: { icon: boldB, className: undefined },
                          italic: { icon: TextItalic, className: undefined },
                          underline: {
                            icon: TextUnderline,
                            className: undefined,
                          },
                        },

                        image: {
                          icon: editorImg,
                          className: undefined,
                          component: undefined,
                          popupClassName: undefined,
                          urlEnabled: true,
                          uploadEnabled: true,
                          alignmentEnabled: true,
                          uploadCallback: _uploadImageCallBack,
                          previewImage: true,
                          inputAccept:
                            "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                          alt: { present: false, mandatory: false },
                          defaultSize: {
                            height: "auto",
                            width: "auto",
                          },
                        },
                        emoji: {
                          icon: Smiley,
                        },
                        blockType: {
                          inDropdown: true,
                        },

                        list: {
                          inDropdown: true,
                        },
                        textAlign: {
                          inDropdown: false,
                          className: undefined,
                          component: undefined,
                          dropdownClassName: undefined,
                          options: ["left", "center", "right"],
                          left: { icon: TextAlignLeft, className: undefined },
                          center: {
                            icon: TextAlignCenter,
                            className: undefined,
                          },
                          right: { icon: TextAlignRight, className: undefined },
                          // justify: { icon: TextAlignCenter, className: undefined },
                        },

                        link: {
                          inDropdown: true,
                        },

                        history: {
                          inDropdown: true,
                        },
                      }}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={(editor) =>
                        onEditorStateChange(editor)
                      }
                    />

                    <div className="sendMsg">
                      <button
                        disabled={sendingReply}
                        onClick={() => replyTicket(ReplyTicket, "attachment")}
                      >
                        <SendMsgIcon /> Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CHAT COL TWO END */}

          {/* CHAT COL THREE */}
          <div className="conversation-layout-col-three">
            {firstTimeLoad ? (
              ""
            ) : loadSingleTicket ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "50px",
                  width: "100%",
                }}
              >
                {" "}
                <ClipLoader
                  color="#0d4166"
                  loading={loadSingleTicket}
                  size={35}
                />
              </div>
            ) : (
              <UserProfile UserInfo={UserInfo} ticket={ticket} />
            )}
          </div>
          {/* CHAT COL THREE END */}
        </div>
      </div>
      <Modal open={openSaveTicketModal} onClose={closeSaveTicketModal} center>
        <div className="saveTicketWrapModal">
          <div className="modalHeaderSaveT">
            Kindly update ticket before closing the chat
          </div>

          <div className="saveTicketModalForm">
            <div className="ticketmodalInput-twoCol">
              <div className="ticketmodalInputWrapMain">
                <label htmlFor="">Customer</label>
                <input
                  value={`${capitalizeFirstLetter(
                    ticket[0]?.customer?.firstname
                  )} ${capitalizeFirstLetter(ticket[0]?.customer?.lastname)}`}
                  type="text"
                  disabled
                />
              </div>

              <div className="ticketmodalInputWrapMain">
                <label htmlFor="">Category</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setCategoryUpdate(e.target.value);
                  }}
                  style={{ fontSize: "12px" }}
                >
                  <option value="">Select Category</option>
                  {Category?.map((data) => {
                    return (
                      <option key={data.id} value={data?.id}>
                        {data?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="ticketmodalInput-OneCol">
              <div className="ticketmodalInputWrapMainOne">
                <label htmlFor="">Subject</label>
                <input
                  type="text"
                  value={`${saveTicket.subject} `}
                  type="text"
                  disabled
                  style={{ fontSize: "12px" }}
                />
              </div>
            </div>

            <div className="descriptionWrap">
              <label htmlFor="">Description</label>
              <textarea
                style={{ padding: "10px" }}
                name=""
                id=""
                value={`${saveTicket?.description?.map((data) => {
                  return data?.plain_response;
                })} `}
                style={{ fontSize: "12px", padding: "7px" }}
              ></textarea>
            </div>

            <div className="closeTicketModdalj">
              <select
                name=""
                id=""
                onChange={(e) => updateTicket(e.target.value)}
              >
                <option value="">Save as</option>
                {Statues?.map((data) => {
                  return <option value={data.id}>{data.status}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
