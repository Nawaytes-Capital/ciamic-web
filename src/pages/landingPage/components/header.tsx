import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../../assets/images/logo-ciamic.png";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -120;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      let currentSection = "";
      if (window.scrollY < 200) currentSection = "home";

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement; // Cast to HTMLElement
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.clientHeight;
        if (
          window.scrollY + 200 >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = sectionElement.id;
        }
      });
      if (currentSection === "home2") currentSection = "home";
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   console.log(activeSection);
  // }, [activeSection]);

  return (
    <header className='header-wrapper'>
      <img src={logo} className='logo' alt='logo' />
      <div className='menu-wrapper'>
        <HashLink
          smooth
          to='/#home'
          style={{
            textDecoration: "none",
          }}
          scroll={(el) => scrollWithOffset(el)}
        >
          <div className={`menu-title ${activeSection === "home" && "active"}`}>
            Home
          </div>
        </HashLink>
        <HashLink
          smooth
          to='/#keuntungan'
          style={{
            textDecoration: "none",
          }}
          scroll={(el) => scrollWithOffset(el)}
        >
          <div
            className={`menu-title ${
              activeSection === "xkeuntungan" && "active"
            }`}
          >
            Keuntungan
          </div>
        </HashLink>
        <HashLink
          smooth
          to='/#cara-penggunaan'
          style={{
            textDecoration: "none",
          }}
          scroll={(el) => scrollWithOffset(el)}
        >
          {" "}
          <div
            className={`menu-title ${
              activeSection === "xcara-penggunaan" && "active"
            }`}
          >
            Cara Penggunaan
          </div>
        </HashLink>
        <HashLink
          smooth
          to='/#feedback'
          style={{
            textDecoration: "none",
          }}
          scroll={(el) => scrollWithOffset(el)}
        >
          {" "}
          <div
            className={`menu-title ${
              activeSection === "xfeedback" && "active"
            }`}
          >
            Feedback
          </div>
        </HashLink>
        <Link
          to={"/usecase"}
          style={{
            textDecoration: "none",
          }}
        >
          <div className='menu-title btn-menu'>Form Usecase</div>
        </Link>
      </div>
      <div className='mobile-menu'>
        <MenuOutlined onClick={() => setIsActive(true)} />
      </div>
      <div className={`fullmenu ${isActive && "active"}`}>
        <div className='fullmenu-wp'>
          <CloseOutlined
            onClick={() => setIsActive(false)}
            style={{
              textAlign: "right",
              display: "block",
              marginBottom: "24px",
            }}
          />
          <HashLink
            smooth
            to='/#home'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            <div className='menu-title '>Home</div>
          </HashLink>
          <HashLink
            smooth
            to='/#keuntungan'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            <div className='menu-title'>Keuntungan</div>
          </HashLink>
          <HashLink
            smooth
            to='/#cara-penggunaan'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            {" "}
            <div className='menu-title'>Cara Penggunaan</div>
          </HashLink>
          <HashLink
            smooth
            to='/#feedback'
            style={{
              textDecoration: "none",
            }}
            onClick={() => setIsActive(false)}
          >
            {" "}
            <div className='menu-title'>Feedback</div>
          </HashLink>
          <Link
            to={"/usecase"}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              className='menu-title btn-menu'
              style={{ textAlign: "center", marginTop: "14px" }}
            >
              Form Usecase
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header