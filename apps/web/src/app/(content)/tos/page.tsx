import { TextContainer, TextContent, TextTitle } from "@/components/text";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EsohaSL - Terms of Service",
};

export default function TermsOfService() {
  return (
    <main className="my-6 flex min-h-screen w-full">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-y-4">
        <div>
          <h1 className="text-3xl font-semibold lg:text-5xl">
            Terms of Service
          </h1>
        </div>

        <TextContent>
          Welcome to esohasl.net! These Terms of Service (&ldquo;Terms&ldquo;)
          govern your use of our platform. By accessing or using our website,
          you agree to be bound by these Terms. Please read them carefully
          before using the site.
        </TextContent>

        <TextContainer>
          <TextTitle>1. Acceptance of Terms</TextTitle>
          <TextContent>
            By using our website, you acknowledge that you have read,
            understood, and agree to comply with these Terms. If you do not
            agree with any provision of these Terms, please do not use our
            website.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>2. Content and Moderation</TextTitle>
          <TextContent>
            2.1. User Responsibility: We do not endorse, guarantee, or take
            responsibility for the accuracy, completeness, or usefulness of any
            content posted by users.
          </TextContent>
          <TextContent>
            2.2. Moderator Rights: As the website administrator, we reserve the
            right to review, modify, delete, or take any action deemed necessary
            regarding user content. We may request users to remove their content
            or delete content without prior notice if we believe they violate
            these Terms, infringe upon intellectual property rights, or are
            otherwise inappropriate.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>3. Cookies</TextTitle>
          <TextContent>
            3.1. Use of Cookies: Our website may use cookies or similar
            technologies to enhance user experience and collect certain
            information about your usage patterns. By using our website, you
            consent to the use of cookies in accordance with our Privacy Policy.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>4. Privacy and Confidentiality</TextTitle>
          <TextContent>
            4.1. Privacy Policy: We are committed to protecting your privacy.
            Our Privacy Policy explains how we collect, use, and disclose
            information about you when you use our website. By using our
            website, you agree to the collection and use of your information as
            described in our&nbsp;
            <Link className="text-primary" href={"/privacy"}>
              Privacy Policy
            </Link>
            .
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>5. Intellectual Property</TextTitle>
          <TextContent>
            5.1. Ownership: All content and materials available on our website,
            including but not limited to text, graphics, logos, images, and
            software, are the property of their respective owners and are
            protected by applicable intellectual property laws.
          </TextContent>
          <TextContent>
            5.2. User Content: By posting content on our website, you grant us a
            non-exclusive, worldwide, royalty-free, and transferable license to
            use, reproduce, modify, distribute, and display the content for the
            purpose of operating and promoting the website.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>6. Limitation of Liability</TextTitle>
          <TextContent>
            6.1. Disclaimer: Our website is provided on an &ldquo;as is&ldquo;
            and &ldquo;as available&ldquo; basis without any warranties,
            expressed or implied. We do not guarantee that the website will be
            error-free, secure, or uninterrupted, and we are not responsible for
            any harm or damages resulting from the use of our website.
          </TextContent>
        </TextContainer>

        <TextContainer>
          <TextTitle>Modifications to Terms</TextTitle>
          <TextContent>
            We reserve the right to modify these Terms at any time without prior
            notice. Any changes will be effective immediately upon posting the
            updated Terms on our website. Your continued use of the website
            after the posting of changes constitutes your acceptance of such
            changes.
          </TextContent>
        </TextContainer>

        <TextContent>
          By using our website, you acknowledge that you have read, understood,
          and agreed to be bound by these Terms of Service.
        </TextContent>
      </div>
    </main>
  );
}
