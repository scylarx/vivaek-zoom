import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { JSX } from "react";

export type ContactEmailProps = {
  name: string;
  email: string;
  phone?: string;
  kind: string;
  message: string;
};

const kindLabels: Record<string, string> = {
  general: "General enquiry",
  classes: "Classes",
  charity: "Charity / ALEG",
  press: "Press",
  donation: "Donation",
};

export function ContactEmail({
  name,
  email,
  phone,
  kind,
  message,
}: ContactEmailProps): JSX.Element {
  const kindLabel = kindLabels[kind] ?? kind;

  return (
    <Html lang="en">
      <Head />
      <Preview>
        New message from {name} — {kindLabel}
      </Preview>
      <Body
        style={{
          backgroundColor: "#f5f0e8",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#2a1f1a",
          margin: 0,
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: "#fff",
            padding: "32px",
            border: "1px solid #d4c8b0",
          }}
        >
          <Heading
            as="h1"
            style={{
              fontSize: "22px",
              fontWeight: 500,
              margin: "0 0 24px",
              color: "#2a1f1a",
            }}
          >
            New message — Odissi Sydney
          </Heading>

          <Hr style={{ borderColor: "#d4c8b0", margin: "0 0 24px" }} />

          <Section>
            <Row>
              <FieldRow label="Reason" value={kindLabel} />
              <FieldRow label="Name" value={name} />
              <FieldRow label="Email" value={email} />
              {phone ? <FieldRow label="Phone" value={phone} /> : null}
            </Row>
          </Section>

          <Hr style={{ borderColor: "#d4c8b0", margin: "24px 0" }} />

          <Text
            style={{
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#7a6a5a",
              margin: "0 0 10px",
            }}
          >
            Message
          </Text>
          <Section
            style={{
              borderLeft: "3px solid #7a1f2b",
              paddingLeft: "16px",
              margin: "0 0 24px",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                lineHeight: "1.65",
                color: "#2a1f1a",
                whiteSpace: "pre-wrap",
                margin: 0,
              }}
            >
              {message}
            </Text>
          </Section>

          <Hr style={{ borderColor: "#d4c8b0", margin: "0 0 16px" }} />

          <Text
            style={{
              fontSize: "13px",
              color: "#7a6a5a",
              margin: 0,
            }}
          >
            Odissi Sydney · odissisydney.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function FieldRow({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <Section style={{ marginBottom: "12px" }}>
      <Text
        style={{
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#7a6a5a",
          margin: "0 0 2px",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: "16px",
          color: "#2a1f1a",
          margin: 0,
        }}
      >
        {value}
      </Text>
    </Section>
  );
}

export default ContactEmail;
