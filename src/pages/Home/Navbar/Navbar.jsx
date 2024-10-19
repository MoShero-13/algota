import { HashLink as Link } from "react-router-hash-link";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// import styled from "styled-components";
import "./Navbar.css";

var main = require("../../../data/mainData.json");
const Navbar = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t, i18n] = useTranslation();
  /* -------------------------------------------------------------------------- */
  /*                               Dropdown Button                              */
  /* -------------------------------------------------------------------------- */
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  /* -------------------------------------------------------------------------- */
  /*                                 Search bar                                 */
  /* -------------------------------------------------------------------------- */
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search", searchTerm);
  };
  return (
    <>
      <header className="header" dir={t("dir")}>
        <div className="container">
          <div className="logo-img">
            {i18n.language === "ar" && (
              <Link to={"/algota/#"}>
                <img src={require("../../../assest/image/logo.png")} alt="" />
              </Link>
            )}
            {i18n.language === "en" && (
              <Link to={"/algota/#"}>
                <img src={require("../../../assest/image/logo1.png")} alt="" />
              </Link>
            )}
          </div>
          <nav>
            <div className="dropdown">
              <ul id="myDropdown" className="dropdown-content">
                <li>
                  <Link to={"/algota/#"} className="active">
                    {t("homepage")}
                  </Link>
                </li>
                <li>
                  <Link to={"/algota/about#aboutUs"}>{t("about")}</Link>
                </li>
                <li>
                  <Link to={"/algota/#product"}>{t("products")}</Link>
                </li>
                <li>
                  <Link to={"/algota/#places"}>{t("places")}</Link>
                </li>
                <li>
                  <Link to={"/algota/#news"}>{t("news")}</Link>
                </li>
                <li>
                  <Link to={"/algota/#our-news"}>{t("ournews")}</Link>
                </li>
                <li>
                  <Link to={"/algota/#contact"}>{t("contact")}</Link>
                </li>
              </ul>
            </div>
            <div
              style={{
                height: "40px",
                direction: "rtl",
                margin: "0 5px",
              }}
            >
              <div className="input-container">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder={t("search")}
                  value={value}
                  onChange={onChange}
                  dir={t("dir")}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  className="icon"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
              </div>
              <div className="dropdown1">
                {main.map((categories) => {
                  return categories.children
                    .filter((item) => {
                      const searchTerm = value.toLowerCase();
                      const fullName = item.name.toLowerCase();
                      return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                      );
                    })
                    .map((i) => {
                      console.log(i);
                      return (
                        <div
                          onClick={() => onSearch(i.name)}
                          className="dropdown-row"
                          key={i.id}
                        >
                          <Link
                            to={`/algota/product/${categories.parent}/#${i.productId}`}
                          >
                            {i.name}
                          </Link>
                        </div>
                      );
                    });
                })}
              </div>
            </div>
            <div className="menu-container" ref={menuRef}>
              <div
                className="menu-trigger"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <i className="fas fa-bars toggle-menu"></i>
              </div>
              {i18n.language === "ar" && (
                <div
                  className={`dropdown-menu ${open ? "active" : "inactive"}`}
                  style={{ left: "20px" }}
                  dir="ltr"
                >
                  <ul className="ul">
                    <DropdownItem href="/algota/#" text={t("homepage")} />
                    <DropdownItem
                      href="/algota/about#aboutUs"
                      text={t("about")}
                    />
                    <DropdownItem
                      href="/algota/#product"
                      text={t("products")}
                    />
                    <DropdownItem href="/algota/#places" text={t("places")} />
                    <DropdownItem href="/algota/#news" text={t("news")} />
                    <DropdownItem
                      href="/algota/#our-news"
                      text={t("ournews")}
                    />
                    <DropdownItem href="/algota/#contact" text={t("contact")} />
                  </ul>
                </div>
              )}
              {i18n.language === "en" && (
                <div
                  className={`dropdown-menu ${open ? "active" : "inactive"}`}
                  style={{ right: "20px" }}
                  dir="rtl"
                >
                  <ul className="ul">
                    <DropdownItem href="/algota/#" text={t("homepage")} />
                    <DropdownItem
                      href="/algota/about#aboutUs"
                      text={t("about")}
                    />
                    <DropdownItem
                      href="/algota/#product"
                      text={t("products")}
                    />
                    <DropdownItem href="/algota/#places" text={t("places")} />
                    <DropdownItem href="/algota/#news" text={t("news")} />
                    <DropdownItem
                      href="/algota/#our-news"
                      text={t("ournews")}
                    />
                    <DropdownItem href="/algota/#contact" text={t("contact")} />
                  </ul>
                </div>
              )}
            </div>
            {i18n.language === "ar" && (
              <span
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
                className="language-a"
              >
                En
              </span>
            )}
            {i18n.language === "en" && (
              <span
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
                className="language-a"
              >
                Ar
              </span>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <Link to={props.href}> {props.text} </Link>
    </li>
  );
}

// const StyledWrapper = styled.div`
//   .input-container {
//     position: relative;
//     display: flex;
//     align-items: center;
//   }

//   .input {
//     width: 40px;
//     height: 40px;
//     border-radius: 20px;
//     border: none;
//     outline: none;
//     padding: 18px 16px;
//     background-color: transparent;
//     cursor: pointer;
//     transition: all 0.5s ease-in-out;
//   }

//   .input::placeholder {
//     color: transparent;
//   }

//   .input:focus::placeholder {
//     color: rgb(131, 128, 128);
//   }

//   .input:focus,
//   .input:not(:placeholder-shown) {
//     background-color: #fff;
//     width: 180px;
//     cursor: none;
//     padding: 18px 16px 18px 45px;
//   }

//   .icon {
//     position: absolute;
//     left: 5px;
//     height: 30px;
//     width: 30px;
//     border-radius: 99px;
//     z-index: -1;
//     fill: #fff;
//   }

//   .input:focus + .icon,
//   .input:not(:placeholder-shown) + .icon {
//     z-index: 0;
//     background-color: transparent;
//     border: none;
//   }
// `;
export default Navbar;
