import { TextContainer, TextContent, TextTitle } from "@/components/text";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EsohaSL - Privacy Policy",
};

export default function Privacy() {
  return (
    <main className="my-6 flex w-full">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-y-4">
        <div>
          <h1 className="text-3xl font-semibold lg:text-5xl">Privacy Policy</h1>
        </div>

        <TextContainer>
          This privacy policy describes how we collect, use, and disclose
          information that you provide to us when visiting our website and using
          our services
          {/* , including AdMaven and Google Analytics */}. We strive to protect
          your privacy and ensure the security of your personal data.
        </TextContainer>

        <TextContainer>
          <TextTitle>Consent and Changes</TextTitle>
          <TextContent>
            By visiting our website and providing personal information, you
            consent to the terms of this privacy policy. We reserve the right to
            make changes to this policy from time to time. In the event of
            significant changes, we will notify you by posting an updated
            privacy policy on our website or sending a notification via email.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>1. Collection and Use of Information</TextTitle>

          <TextContent>
            1.1. Personal Information: We may collect certain personal
            information, such as your username, email address, and other contact
            information that you voluntarily provide when registering on our
            website or submitting an inquiry through a contact form. We use this
            information to process your requests, provide you with the requested
            services, and communicate with you.
          </TextContent>

          {/* <TextContent>
            1.2. Information from AdMaven: We utilize the AdMaven advertising
            platform to display ads on our website. AdMaven may use cookies and
            other tracking technologies to gather information about your
            preferences and interaction with advertisements. This information
            helps us deliver more relevant advertising and enhance your
            experience on our site.&nbsp;
            <Link
              className="text-foreground"
              href={"https://ad-maven.com/privacy-policy/"}
              target="_blank"
            >
              AdMaven&apos;s privacy policy
            </Link>
            &nbsp;applies to the collection and use of such information.
          </TextContent> */}
        </TextContainer>

        <TextContainer>
          <TextTitle>2. Cookies and Web Beacons</TextTitle>
          <TextContent>
            Like any other website, esohasl.net uses &quot;cookies&quot;. These
            cookies are used to store information including visitors&apos;
            preferences, and the pages on the website that the visitor accessed
            or visited. The information is used to optimize the users&apos;
            experience by customizing our web page content based on
            visitors&apos; browser type and/or other information.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>3. Third Party Privacy Policies</TextTitle>
          <TextContent>
            esohasl.net&apos;s Privacy Policy does not apply to other
            advertisers or websites. Thus, we are advising you to consult the
            respective Privacy Policies of these third-party ad servers for more
            detailed information. It may include their practices and
            instructions about how to opt-out of certain options. You can choose
            to disable cookies through your individual browser options. To know
            more detailed information about cookie management with specific web
            browsers, it can be found at the browsers&apos; respective websites.
          </TextContent>
        </TextContainer>
      </div>
    </main>
  );
}
