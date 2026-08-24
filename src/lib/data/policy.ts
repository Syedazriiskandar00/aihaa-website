// Polisi syarikat AIHAA — sumber: dokumen HQ
// "T&C,PP,CRP - PHYSICAL PRODUCT.docx".
//
// TEKS INI VERBATIM DARI HQ. Jangan sunting perkataan, ejaan, tanda baca
// atau susunan di sini. Sebarang pindaan mesti datang dari HQ dahulu, dan
// dokumen .docx asal dikemas kini serentak supaya kedua-duanya sepadan.
// Modul ini hanya memberi struktur (tajuk / perenggan / senarai) supaya
// /polisi boleh render teks yang sama tanpa mengubahnya.

export type PolicyBlock =
  | { kind: "subheading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

export type PolicyDocument = {
  id: string; // anchor URL, cth /polisi#privacy-policy
  title: string;
  blocks: PolicyBlock[];
};

export const POLICY_DOCUMENTS: PolicyDocument[] = [
  {
    id: "terms-conditions",
    title: "TERMS & CONDITIONS",
    blocks: [
      { kind: "subheading", text: "Terms & Conditions" },
      { kind: "paragraph", text: "Welcome to AIHAA MARKETING SDN BHD for online store. Terms and conditions stated below applies to all visitors and users of aihaateam@gmail.com/. You are bound by these terms and conditions as long as you're on aihaateam@gmail.com/." },
      { kind: "subheading", text: "General" },
      { kind: "paragraph", text: "The content of terms and conditions may be change, move or delete at any time. Please note that aihaateam@gmail.com/. have the rights to change the contents of the terms and conditions without any notice. Any violation of rules and regulations of these terms and conditions, aihaateam@gmail.com/. will take immediate actions against the offender(s)." },
      { kind: "subheading", text: "Site Contents & Copyrights" },
      { kind: "paragraph", text: "Unless otherwise noted, all materials, including images, illustrations, designs, icons, photographs, video clips, and written and other materials that appear as part of this Site, in other words “Contents of the Site” are copyrights, trademarks, trade dress and/or other intellectual properties owned, controlled or licensed by AIHAA MARKETING SDN BHD." },
      { kind: "subheading", text: "Comments and Feedbacks" },
      { kind: "paragraph", text: "All comments and feedbacks to AIHAA MARKETING SDN BHD will be remain aihaateam@gmail.com/." },
      { kind: "paragraph", text: "User shall agree that there will be no comment(s) submitted to the aihaateam@gmail.com/.  will violate any rights of any third party, including copyrights, trademarks, privacy of other personal or proprietary right(s). Furthermore, the user shall agree there will not be content of unlawful, abusive, or obscene material(s) submitted to the site. User will be the only one responsible for any comment's content made." },
      { kind: "subheading", text: "Product Information" },
      { kind: "paragraph", text: "We cannot guarantee all actual products will be exactly the same shown on the monitor as that is depending on the user monitor." },
      { kind: "subheading", text: "Newsletter" },
      { kind: "paragraph", text: "User shall agree that aihaateam@gmail.com/. may send newsletter regarding the latest news/products/promotions etc through email to the user." },
      { kind: "subheading", text: "Indemnification" },
      { kind: "paragraph", text: "The user shall agree to defend, indemnify and hold aihaateam@gmail.com/. harmless from and against any and all claims, damages, costs and expenses, including attorneys' fees, arising from or related to your use of the Site." },
      { kind: "subheading", text: "Link to other sites" },
      { kind: "paragraph", text: "Any access link to third party sites is at your own aihaateam@gmail.com/.  will not be related or involve to any such website if the user's content/product(s) got damaged or loss have any connection with third party site." },
      { kind: "subheading", text: "Inaccuracy Information" },
      { kind: "paragraph", text: "From time to time, there may be information on aihaateam@gmail.com/. that contains typographical error, inaccuracies, omissions, that may relate to product description, pricing, availability and article contents. We reserve the rights to correct any errors, inaccuracies, change or edit information without prior notice to the customers. If you are not satisfy with your purchased product(s), please return it back to us with the invoice." },
      { kind: "subheading", text: "Termination" },
      { kind: "paragraph", text: "This agreement is effective unless and until either by the customer or aihaateam@gmail.com/. Customer may terminate this agreement at any time. However, aihaateam@gmail.com/   may also terminate the agreement with the customer without any prior notice and will be denying the access of the customer who is unable to comply the terms and conditions above." },
      { kind: "subheading", text: "Payments" },
      { kind: "paragraph", text: "All Goods purchased are subject to a one-time payment. Payment can be made through various payment methods we have available, such as Visa, MasterCard or online payment methods." },
      { kind: "paragraph", text: "Payments cards (credit cards or debit cards) are subject to validation checks and authorization by Your card issuer. If we do not receive the required authorization, we will not be liable for any delay or non-delivery of Your Order." },
    ],
  },
  {
    id: "privacy-policy",
    title: "PRIVACY POLICY",
    blocks: [
      { kind: "subheading", text: "Your Privacy" },
      { kind: "paragraph", text: "We respect the privacy of your personal information and we strive to maintain the confidentiality of your personal information given by you. The objective of collecting your personal data is to deliver products and services, future marketing purposes and to improve our services to you. Only our authorized employees have access to your personal information. We will not disclose information about our customers to third parties except where it is part of providing a service to you - e.g. arranging for a product to be sent to you, carrying out credit and other security checks and for the purposes of customer research and profiling or where we have your express permission to do so. We may also be required to disclose such information to regulators, lawyers, auditors, other companies in the same group, third party service providers and appointed marketing agency." },
      { kind: "subheading", text: "Your Consent" },
      { kind: "paragraph", text: "We will not sell your name, address, e-mail address, credit card information or personal information to any third party (excluding partners from whom you may have linked to our site) without your permission." },
      { kind: "subheading", text: "Communication & Marketing" },
      { kind: "paragraph", text: "If you have made a purchase from our store we may occasionally update you on our latest products, news and special offers via e-mail, post & telephone. You will also be given the opportunity to receive such communications from us and selected third parties when you become a member of AIHAA MARKETING SDN BHD." },
      { kind: "paragraph", text: "All AIHAA MARKETING SDN BHD members have the option to opt-out of receiving marketing communications from us and/or selected third parties. If you do not wish to continue to receive marketing from us and/or selected third parties you should opt-out by visiting 'Your Details' in 'Your Account' on the AIHAA MARKETING SDN BHD website. You can access 'Your Account' once you register and login. Or click on the 'unsubscribe' link in any email communications which might we send you." },
      { kind: "subheading", text: "What are Cookies?" },
      { kind: "paragraph", text: "A cookie is a small information file that is sent to your computer and is stored on your hard drive. If you have registered with us then your computer will store an identifying cookie which will save you time each time you re-visit AIHAA MARKETING SDN BHD by remembering your email address for you. You can change the settings on your browser to prevent cookies being stored on your computer without your explicit consent." },
      { kind: "subheading", text: "Site Statistics" },
      { kind: "paragraph", text: "We may disclose aggregate, anonymised statistics about the number of visitors to this Website or number of purchases made as required by our investors. We use an independent measurement and research company to gather data regarding the visitors to this Website on our behalf using cookies and code which is embedded in the site. Both the cookies and the embedded code provide statistical information about visits to pages on the site, the duration of individual page view, paths taken by visitors through the site, data on visitors' screen settings and other general information. AIHAA MARKETING SDN BHD uses and stores this type of information, as with that obtained from other cookies used on the site, to help it improve the services to its users. Further information regarding the way in which this information is obtained and used can be obtained by contacting us." },
      { kind: "subheading", text: "Disclosures of your information" },
      { kind: "paragraph", text: "We may disclose your personal information to any of our group of companies. We may also disclose your personal information to third parties:" },
      {
        kind: "list",
        items: [
          "In the event that AIHAA MARKETING SDN BHD sells or buys any business or assets.",
          "If AIHAA MARKETING SDN BHD or substantially all of its assets are acquired by a third party, in which case personal data which we hold about our customers may be one of the transferred assets; or",
          "If we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply our terms of; or to protect the rights, property, or safety of FVSB, our customers, or others. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.",
        ],
      },
      { kind: "subheading", text: "Third Party Sites" },
      { kind: "paragraph", text: "Our site may contain links to and from the websites of our partner networks, advertisers and other third parties. If you follow a link to any of these websites, please note that they have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites." },
      { kind: "subheading", text: "Checking Your Details" },
      { kind: "paragraph", text: "If you wish to verify the details you have submitted to AIHAA MARKETING SDN BHD, you may do so by contacting us via the e-mail address or address given below. Our security procedures mean that we may request proof of identity before we reveal information. This proof of identity will take the form of your e-mail address and password submitted upon registration. You must therefore keep this information safe as you will be responsible for any action which we take in response to a request from someone using your e-mail and password. We would strongly recommend that you do not use the browser's password memory function as that would permit other people using your terminal to access your personal information." },
      { kind: "subheading", text: "Contacting Us" },
      { kind: "paragraph", text: "We are always pleased to hear from our customers (even if it is a complaint!). We are always grateful for any time you spend providing us with the knowledge we need to ensure our customers are completely satisfied - we want you to return to the site and to recommend us to your friends and family. If you have any questions or feedback about this statement, or if you would like us to stop processing your information, please do not hesitate to contact a member of the AIHAA MARKETING SDN BHD team, who will be delighted to answer any questions you may have." },
    ],
  },
  {
    id: "cancellation-refund-policy",
    title: "CANCELLATION, AND REFUND POLICY",
    blocks: [
      { kind: "paragraph", text: "(not applicable for intangible product)" },
      { kind: "paragraph", text: "**(Note: Kindly amend according to your business service)" },
      { kind: "subheading", text: "Cancellation Prior to Shipment" },
      { kind: "paragraph", text: "If you cancel your order(s) before it ships from our warehouse, you will not be charged any additional fees. We require a cancellation request to be submitted by emailing us at aihaateam@gmail.com/" },
      { kind: "paragraph", text: "Once the cancellation request is received, a full refund will be initiated. We would advise a cancellation request within 12 hours upon your order submission in order for a cancellation prior to goods shipment" },
      { kind: "subheading", text: "Return Policy" },
      { kind: "paragraph", text: "The following are the policies to be eligible for return requests after shipment/receipt of goods:" },
      { kind: "paragraph", text: "1. All goods sold are non-refundable except (i) Failed Delivery (ii) Wrong Delivery and (iii) Damaged good during delivery." },
      { kind: "paragraph", text: "2. Only items that have been purchased directly from aihaateam@gmail.com/  Online Store can be eligible for a return." },
      { kind: "paragraph", text: "3. Any aihaateam@gmail.com/  Online Store product purchased through other retailers is not eligible for this policy and must follow the respective retailers’ returns and refunds policy." },
      { kind: "paragraph", text: "4. Goods are eligible for a return if the following apply:" },
      { kind: "subheading", text: "Incorrect:" },
      {
        kind: "list",
        items: [
          "The item is not the item you ordered",
          "Wrong size or the colour is different from what is indicated on the order summary",
          "Missing items inside the packaging",
        ],
      },
      { kind: "subheading", text: "Damaged:" },
      {
        kind: "list",
        items: [
          "The item is found to be damaged upon receipt. Items has been tampered/refurbished or modified. Customers will be responsible for all shipping charges to return goods. Returns are applicable only for a complete aihaateam@gmail.com/0137366805 Online Store product.",
        ],
      },
      { kind: "paragraph", text: "Returned items must meet the following requirements:" },
      {
        kind: "list",
        items: [
          "The item must be shipped back to us within 7 working days upon receipt (as proved by the postal or courier receipt)",
          "You have proof of purchase (order invoice number and receipt)",
          "Item must be in new condition and returned in its original packaging and free gifts received with it. All packaging must be unused, unmarked and not defaced in any manner",
          "Item must be returned in the original box (or at least, suitable packaging) to protect the product from damage during return delivery",
          "Change of order and cancellation of order will not be permitted once payment has been confirmed. Any cancellations due to a change of mind will not be accepted.",
          "We reserve the right to reject any cancellation or refund that is deemed unfit or unreasonable.",
        ],
      },
      { kind: "subheading", text: "Return Policy" },
      { kind: "paragraph", text: "Your full refund will be issued once we have received and examined the returned goods at our return center. Once the returned goods fulfil our return policy, the full refund will be initiated. The method of refund will be processed depending on your original payment method:" },
      {
        kind: "list",
        items: [
          "For Online Bank Transfer: Full refunds will be credited into your bank account via online bank transfer, which should be posted within 3–5 working days.",
          "For Credit Card refunds: Refunds will be sent to the card-issuing bank.",
        ],
      },
      { kind: "paragraph", text: "Kindly contact your card-issuing bank regarding the duration of the credit refund." },
    ],
  },
  {
    id: "shipping-policy",
    title: "SHIPPING POLICY",
    blocks: [
      { kind: "paragraph", text: "(not applicable for intangible product)" },
      { kind: "paragraph", text: "**(Note: Kindly amend according to your business service)" },
      { kind: "subheading", text: "Shipping Address" },
      { kind: "paragraph", text: "We will only ship to addresses provided in the billing address or shipment address provided during your purchase." },
      { kind: "paragraph", text: "Please ensure correct addresses and reachable phone number are provided when completing your order. We do not ship to P.O Boxes (Post-Office Box) and only to valid legitimate shipping addresses." },
      { kind: "paragraph", text: "We will not be liable in the event of an incorrect shipping address is provided and goods are returned to us." },
      { kind: "paragraph", text: "All re-delivery of goods to you will be charged for a associated shipping charges which will be disclosed upon request for a second delivery attempt." },
      { kind: "subheading", text: "Change In Shipping Address" },
      { kind: "paragraph", text: "If you have any request for change of shipping address, please email us at aihaateam@gmail.com/0137366805 within 12 hours upon your order submission." },
      { kind: "paragraph", text: "If request of change in shipping address is made after 24 hours upon order confirmation, customers will be responsible for any associated shipping charges." },
      { kind: "subheading", text: "Shipping Time" },
      { kind: "paragraph", text: "It typically takes between 2-5 working days (Monday to Friday) for goods to arrive at your destination. The shipment will be delivered during office hours between 9:00 am to 5:00 pm weekdays only." },
      { kind: "subheading", text: "Tracking Number" },
      { kind: "paragraph", text: "Once goods is picked up by our shipping partner, the tracking ID for the package will be available. Any communication is to be via email/mobile app/sms." },
      { kind: "paragraph", text: "For non-tangible products or services, confirmation of order and receipt will be communicated via email/mobile app/sms. Proof of purchase, invoice or delivery order will be available." },
      { kind: "paragraph", text: "We reserve the right to amend this policy from time to time if deemed necessary, in which no prior notification or approval from the customer is required." },
    ],
  },
];
