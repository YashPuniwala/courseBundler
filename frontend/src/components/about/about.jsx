import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import introVideo2 from "../../assets/videos/introVideo2.mp4";
import PaymentsIcon from "@mui/icons-material/Payments";
import "./about.css";

const TermsAndCondition = `The domain name www.flipkart.com (hereinafter referred to as "Website") is owned by Flipkart Internet Private Limited a company incorporated under the Companies Act, 1956 with its registered office at Vaishnavi Summit, Ground Floor, 7th Main, 80 feet Road, 3rd Block, Koramangala Industrial Layout, Next to Wipro office, Corporation Ward No. 68, Koramangala, Bangalore - 560 034, Karnataka, India (hereinafter referred to as "Flipkart").

Your use of the Website and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Website including the applicable policies which are incorporated herein by way of reference. If You transact on the Website, You shall be subject to the policies that are applicable to the Website for such transaction. By mere use of the Website, You shall be contracting with Flipkart Internet Private Limited and these terms and conditions including the policies constitute Your binding obligations, with Flipkart.

For the purpose of these Terms of Use, wherever the context so requires "You" or "User" shall mean any natural or legal person who has agreed to become a buyer on the Website by providing Registration Data while registering on the Website as Registered User using the computer systems. Flipkart allows the User to surf the Website or making purchases without registering on the Website. The term "We", "Us", "Our" shall mean Flipkart Internet Private Limited.

When You use any of the services provided by Us through the Website, including but not limited to, (e.g. Product Reviews, Seller Reviews), You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part and parcel of this Terms of Use. We reserve the right, at Our sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time without any prior written notice to You. It is Your responsibility to review these Terms of Use periodically for updates / changes. Your continued use of the Website following the posting of changes will mean that You accept and agree to the revisions. As long as You comply with these Terms of Use, We grant You a personal, non-exclusive, non-transferable, limited privilege to enter and use the Website.

ACCESSING, BROWSING OR OTHERWISE USING THE SITE INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING. By impliedly or expressly accepting these Terms of Use, You also accept and agree to be bound by Flipkart Policies ((including but not limited to Privacy Policy available on /s/privacypolicy) as amended from time to time.

Membership on the Website is free for buyers. Flipkart does not charge any fee for browsing and buying on the Website. Flipkart reserves the right to change its Fee Policy from time to time. In particular, Flipkart may at its sole discretion introduce new services and modify some or all of the existing services offered on the Website. In such an event Flipkart reserves the right to introduce fees for the new services offered or amend/introduce fees for existing services, as the case may be. Changes to the Fee Policy shall be posted on the Website and such changes shall automatically become effective immediately after they are posted on the Website. Unless otherwise stated, all fees shall be quoted in Indian Rupees. You shall be solely responsible for compliance of all applicable laws including those in India for making payments to Flipkart Internet Private Limited.

We view protection of Your privacy as a very important principle. We understand clearly that You and Your Personal Information is one of Our most important assets. We store and process Your Information including any sensitive financial information collected (as defined under the Information Technology Act, 2000), if any, on computers that may be protected by physical as well as reasonable technological security measures and procedures in accordance with Information Technology Act 2000 and Rules there under. Our current Privacy Policy is available at /s/privacypolicy. If You object to Your Information being transferred or used in this way please do not use Website.

We and our affiliates will share / sell / transfer / license / covey some or all of your personal information with another business entity should we (or our assets) plan to merge with or are acquired by that business entity, or re-organization, amalgamation, restructuring of business or for any other reason whatsoever. Should such a transaction or situation occur, the other business entity or the new combined entity will be required to follow the privacy policy with respect to your personal information. Once you provide your information to us, you provide such information to us and our affiliate and we and our affiliate may use such information to provide you various services with respect to your transaction whether such transaction are conducted on www.flipkart.com or with third party merchant's or third party merchant's website.
`;

const About = () => {
  return (
    <Box sx={{backgroundColor:"#212121", height:"265vh"}}>
      <Box
        className="aboutBox"
        sx={{
          height: { xs: "120vh", sm: "75vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem",
          backgroundColor:"#212121"
        }}
      >
        <Typography variant="h4" sx={{color:"white"}}>About Us</Typography>
        <Stack
          className="aboutStack"
          spacing={8}
          direction={{ xs: "column", sm: "row" }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: { xs: "40px", sm: "20px" },
            color:"white"
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              sx={{ width: 170, height: 170 }}
            />
            <Typography
              variant="body1"
              sx={{ marginTop: { xs: "20px", sm: "10px" } }}
            >
              Learner
            </Typography>
          </Box>

          <Box
            sx={{
              overflow: "hidden",
              width: { xs: "20rem", sm: "30rem" },
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                sm: "flex-start",
              },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h5">Yash Puniwala</Typography>
            <Typography sx={{ wordBreak: "break-word" }} variant="body1">
              Hii, I am Full-Stack-Developer and a learner. Our mission is to
              provide quality content at reasonable price.
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            marginTop: "80px",
            width: { xs: "20rem", sm: "45rem" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" },
            color:"white"
          }}
        >
          <Typography variant="body1" sx={{ wordBreak: "break-word", color:"white" }}>
            We are providng platform with same premium courses available only
            for premium users.
          </Typography>
          <Link to="/subscribe" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                textTransform: "none",
                width: "150px",
                color: "#FFEA20",
              }}
            >
              Check Our Plan
            </Button>
          </Link>
        </Box>
      </Box>
      <Box className="aboutVideoBox" style={{marginBottom:"130px"}}>
        <video
          className="aboutVideo"
          autoPlay
          loop
          muted
          controls
          controlsList="nodownload nofull noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo2}
        ></video>
      </Box>

      <Box sx={{backgroundColor:"#212121", color:"white"}}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "bold",
            fontSize: "25px",
            fontSize: "25px",
            marginBottom: "30px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            color:"white"
          }}
        >
          Terms and Condition
        </Typography>

        <Box
          sx={{
            overflowY: "scroll",
            width: {xs:"20rem", sm:"50rem"},
            height: "30rem",
            margin: "auto",
          }}
        >
          <Typography variant="body1" sx={{textAlign:{xs:"center", sm:"start"}}}>{TermsAndCondition}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: {xs:"280px", sm:"300px"},
            margin: "auto",
            marginTop: "30px",
          }}
        >
          <PaymentsIcon sx={{ marginRight: "15px" }} />
          <Typography>Payment is secured by RazorPay</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
