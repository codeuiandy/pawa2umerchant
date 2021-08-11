import React from "react";
import { useState } from "react";
import { SearchIconNavbr, SendIcon } from "../../../assets/images/svgs";
import HelpNavBar from "../../Layout/helpNavBar";
import Accordion from "./components/accordion/Accordion";
import NavCard from "./components/navCard/navCard";
import { faqs } from "./faq";
import "./helpCenter.scss";
import LogoBG from "../../../assets/imgF/logoBG.png";

const HelpCenter = () => {
  const navigation = [
    {
      icon: "work",
      link: "/get-started",
      title: "Get Started",
      items: ["Importing Customers", "Creating Tickets"],
    },
    {
      icon: "account",
      link: "/my-account",
      title: "My Account",
      items: ["Profile Update", "Change Password"],
    },
    {
      icon: "subscription",
      link: "/subscription-&-license",
      title: "Subscription & License",
      items: ["Subcription Activation", "License Upgrade"],
    },
    {
      icon: "users",
      link: "/user-management",
      title: "User Management",
      items: ["Import Users", "User Groups", "AD/LDAP Integration"],
    },
    {
      icon: "settings",
      link: "/integrations",
      title: "Integrations",
      items: ["My SQL Integration", "API Import and Sync"],
    },
    {
      icon: "document",
      link: "/forms-&-survey",
      title: "Forms & Survey",
      items: ["Form Builder", "Survey Creation"],
    },
  ];
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.value);
  };
  return (
    <>
      <HelpNavBar />
      <div className="help-center">
        <div className="search-container">
          <img src={LogoBG} alt="" className="logo-bg" />
          <h3>How can we help?</h3>
          <div className="searchbar">
            <div className="icon">
              <SearchIconNavbr />
            </div>
            <form>
              <input
                type="text"
                value={search}
                placeholder="Search help center"
                onChange={handleChange}
              />
              <button>
                <SendIcon size={30} />
              </button>
            </form>
          </div>
        </div>
        <div className="navigation-cards">
          <div className="nav-cards">
            {navigation.map((nav, i) => (
              <NavCard
                key={`item-${i + 1}`}
                icon={nav.icon}
                title={nav.title}
                items={nav.items}
                link={nav.link}
              />
            ))}
          </div>

          <div className="popular-questions">
            <h3>Most Popular Questions</h3>
            <div className="accordions">
              {faqs.map((item) => (
                <Accordion
                  key={item.id}
                  question={item.question}
                  solution={item.solution}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenter;
