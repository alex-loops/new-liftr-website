import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { usePageMotion } from '../hooks/usePageMotion'
import { openCookieSettings } from '../components/CookieConsent'

interface Props {
  kind: 'privacy' | 'cookies'
}

type Block =
  | { p: ReactNode }
  | { list: ReactNode[] }
  | { table: { head: string[]; rows: ReactNode[][] } }

interface Section {
  title: string
  blocks: Block[]
}

const EMAIL = 'dataprotection@liftr.studio'
const Mail = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>

/* Approved copy: Liftr Privacy Policy and Cookie Policy, last updated 2 November 2026. */
const COPY: Record<Props['kind'], { title: string; updated: string; intro: ReactNode; sections: Section[] }> = {
  privacy: {
    title: 'Privacy policy',
    updated: '2 November 2026',
    intro:
      'This policy explains what personal information Liftr collects through liftr.studio and in the course of our work, why we use it, who we share it with and the rights you have. We keep it short and specific to what we actually do.',
    sections: [
      {
        title: 'Who we are',
        blocks: [
          {
            p: 'Liftr Limited is a company registered in England and Wales with company number 14052657. Our registered office is 71 to 75 Shelton Street, London, WC2H 9JQ. For the personal information described in this policy, Liftr Limited is the controller, which means we decide how and why it is used.',
          },
          { p: 'We are registered with the Information Commission’s Office (ICO) under registration number ZB453651.' },
          {
            p: (
              <>
                To contact us about your personal information, email <Mail /> or write to the address above.
              </>
            ),
          },
        ],
      },
      {
        title: 'What we collect',
        blocks: [
          {
            table: {
              head: ['What', 'Examples', 'Where it comes from'],
              rows: [
                [
                  'Enquiry details',
                  'Your name, email address, company, startup stage, the plan you are interested in and your message',
                  'You, through our contact form or by email',
                ],
                [
                  'Business relationship details',
                  'Contact details, meeting notes, proposals, contracts, invoices and payment records',
                  'You and your company, once we discuss or start work together',
                ],
                [
                  'Introductions',
                  'Your name, role, company and contact details',
                  'A mutual contact, partner or investor who introduces us, with your knowledge',
                ],
                [
                  'Public business information',
                  'Company and director records, professional profiles',
                  'Companies House and similar public sources',
                ],
                [
                  'Website and device information',
                  'IP address, browser and device type, pages visited, referring site, approximate location',
                  'Your device, our hosting provider and, only if you allow it, our analytics provider',
                ],
                [
                  'Preferences stored on your device',
                  'Your colour theme and your cookie choice',
                  <>
                    Your device (see our <Link to="/cookies">cookie policy</Link>)
                  </>,
                ],
              ],
            },
          },
          {
            p: 'We do not ask for special category information, such as health, ethnic origin, religion, political opinions or sexual orientation, and we do not collect information about criminal convictions. Please do not include this kind of information in your messages to us.',
          },
          { p: 'Our website and services are for founders and businesses. They are not aimed at anyone under 18.' },
        ],
      },
      {
        title: 'How we use it, and our lawful basis',
        blocks: [
          { p: 'Data protection law requires a lawful basis for each use of your information. Ours are set out below.' },
          {
            table: {
              head: ['Purpose', 'Lawful basis'],
              rows: [
                [
                  'Reply to your enquiry and arrange a call',
                  'Steps you ask us to take before a contract, and our legitimate interest in responding to business enquiries',
                ],
                ['Prepare proposals and deliver services to clients', 'Performance of a contract, or steps before one'],
                [
                  'Manage our relationship, invoicing, accounts and tax',
                  'Performance of a contract and compliance with legal obligations',
                ],
                [
                  'Send occasional news about our services',
                  'Your consent, or our legitimate interest where the law allows us to contact business email addresses. Every message includes a way to unsubscribe',
                ],
                ['Keep our website secure and working', 'Our legitimate interest in running a safe, reliable website'],
                [
                  'Understand how visitors use our website so we can improve it',
                  'Your consent, given through our cookie banner',
                ],
                [
                  'Establish, exercise or defend legal claims',
                  'Our legitimate interest in protecting our business, and compliance with legal obligations',
                ],
              ],
            },
          },
          {
            p: 'Where we rely on legitimate interests, we have balanced our interests against yours and you can object at any time (see section 8). Where we rely on consent, you can withdraw it at any time, and this does not affect anything we did before you withdrew it.',
          },
          {
            p: 'We do not make decisions about you based solely on automated processing, including profiling, that have a legal or similarly significant effect on you.',
          },
        ],
      },
      {
        title: 'Who we share it with',
        blocks: [
          { p: 'We share personal information only where we need to, and we never sell it.' },
          {
            table: {
              head: ['Who', 'Why'],
              rows: [
                ['Our group company in Romania, Liftr Product Development Studio S.R.L.', 'To staff and deliver client work'],
                [
                  'Specialist subcontractors, such as engineers and designers',
                  'To deliver client work, under contracts that protect your information',
                ],
                [
                  'Service providers that run our business: website hosting, email, form delivery and, only with your consent, analytics',
                  'To operate our website and communicate with you. They act on our instructions under written contracts',
                ],
                [
                  'Professional advisers: accountants, lawyers, auditors and insurers',
                  'To run our business properly and meet our obligations',
                ],
                ['Banks and payment providers', 'To send and receive payments'],
                ['HMRC, regulators, courts and law enforcement', 'Where the law requires it'],
                [
                  'A buyer of, or investor in, our business',
                  'If we sell or restructure our business, under confidentiality terms',
                ],
              ],
            },
          },
        ],
      },
      {
        title: 'International transfers',
        blocks: [
          {
            p: 'Most of the information we hold stays in the UK or the European Economic Area (EEA). Our group company and some subcontractors are based in the EEA, which the UK recognises as giving adequate protection.',
          },
          {
            p: 'Some of our service providers, including our website host, are based in the United States or process information there. When information leaves the UK, we make sure it stays protected in one of these ways:',
          },
          {
            list: [
              'the destination is covered by UK adequacy regulations, including the UK extension to the EU-US Data Privacy Framework (the UK-US data bridge) for certified US companies; or',
              'we use the ICO’s International Data Transfer Agreement, or the UK Addendum to the EU standard contractual clauses.',
            ],
          },
          { p: 'You can ask us for more detail about the safeguards we use.' },
        ],
      },
      {
        title: 'How long we keep it',
        blocks: [
          {
            p: 'We keep personal information only as long as we need it for the purpose we collected it, then delete or anonymise it.',
          },
          {
            table: {
              head: ['Information', 'How long'],
              rows: [
                ['Enquiries that do not lead to work together', '12 months after our last contact'],
                [
                  'Client and supplier records, contracts and invoices',
                  'The length of the relationship plus 6 years, for legal, tax and accounting reasons',
                ],
                ['Marketing preferences', 'Until you unsubscribe, or 12 months after you last engaged with us'],
                ['Hosting and security logs', 'The short period of 7 days set by our hosting provider'],
              ],
            },
          },
          { p: 'We may keep information longer where the law requires it or where we need it for a legal claim.' },
        ],
      },
      {
        title: 'How we protect it',
        blocks: [
          {
            p: 'We use appropriate technical and organisational measures to protect personal information. These include encrypted connections to our website, access limited to people who need it, multi-factor authentication on our business systems and written data protection terms with every provider and subcontractor who handles personal information for us.',
          },
        ],
      },
      {
        title: 'Your rights',
        blocks: [
          { p: 'You have these rights over your personal information:' },
          {
            list: [
              <>
                <strong>Access:</strong> ask for a copy of the information we hold about you.
              </>,
              <>
                <strong>Correction:</strong> ask us to correct information that is wrong or incomplete.
              </>,
              <>
                <strong>Erasure:</strong> ask us to delete your information in certain circumstances.
              </>,
              <>
                <strong>Restriction:</strong> ask us to limit how we use your information in certain circumstances.
              </>,
              <>
                <strong>Portability:</strong> ask for information you gave us in a format you can pass to someone else.
              </>,
              <>
                <strong>Objection:</strong> object to uses based on our legitimate interests. You can object to direct
                marketing at any time, and we will stop.
              </>,
              <>
                <strong>Withdraw consent:</strong> where we rely on your consent, withdraw it at any time.
              </>,
            ],
          },
          {
            p: (
              <>
                To use any of these rights, email <Mail />. It is free in most cases. We may ask you to confirm your
                identity or to clarify your request, and the time to respond starts once we have what we need. We respond
                within one month, or within three months for complex requests, in which case we will tell you why within
                the first month.
              </>
            ),
          },
        ],
      },
      {
        title: 'Complaints',
        blocks: [
          {
            p: (
              <>
                If you are unhappy with how we have handled your personal information, please tell us first at <Mail />.
                We will acknowledge your complaint within 30 days, look into it, and tell you the outcome without undue
                delay.
              </>
            ),
          },
          {
            p: (
              <>
                You also have the right to complain to the Information Commission’s Office (ICO), the UK data protection
                regulator, at{' '}
                <a href="https://ico.org.uk" target="_blank" rel="noreferrer">
                  ico.org.uk
                </a>{' '}
                or on 0303 123 1113.
              </>
            ),
          },
        ],
      },
      {
        title: 'Links to other websites',
        blocks: [
          {
            p: 'Our website links to other sites, such as LinkedIn. Those sites have their own privacy policies, and we are not responsible for how they handle your information.',
          },
        ],
      },
      {
        title: 'Changes to this policy',
        blocks: [
          {
            p: 'We review this policy regularly and update it when our practices or the law change. The date at the top shows when it last changed. If we make a significant change that affects you, we will tell you directly where we can.',
          },
        ],
      },
    ],
  },
  cookies: {
    title: 'Cookie policy',
    updated: '2 November 2026',
    intro: (
      <>
        This policy explains the small files and settings our website stores on your device, why we use them and how you
        can change your choice. It should be read with our <Link to="/privacy">privacy policy</Link>.
      </>
    ),
    sections: [
      {
        title: 'What cookies are',
        blocks: [
          {
            p: 'Cookies are small text files that a website stores on your device. Websites can also store information in your browser in similar ways, such as local storage. In this policy, “cookies” covers all of these.',
          },
        ],
      },
      {
        title: 'The cookies we use',
        blocks: [
          {
            p: 'We use as few cookies as possible. We do not use advertising cookies, and we do not track you across other websites.',
          },
          {
            table: {
              head: ['Name', 'Type', 'Purpose', 'How long it lasts', 'Needs your consent?'],
              rows: [
                [
                  <code>liftr-mode</code>,
                  'Appearance (local storage)',
                  'Remembers whether you chose the light or dark theme',
                  'Until you clear your browser storage',
                  'No',
                ],
              ],
            },
          },
          {
            p: 'Our hosting provider may also use strictly necessary technologies to deliver the website securely and protect it from attacks.',
          },
        ],
      },
      {
        title: 'Your choices',
        blocks: [
          { p: 'When you first visit our website, a banner asks whether you accept analytics cookies. You can:' },
          {
            list: [
              <>
                <strong>Accept all</strong>, to allow analytics cookies;
              </>,
              <>
                <strong>Reject non-essential</strong>, so only strictly necessary and appearance settings are used; or
              </>,
              <>
                <strong>Manage preferences</strong>, to choose for yourself.
              </>,
            ],
          },
          {
            p: (
              <>
                You can change your mind at any time with the{' '}
                <button type="button" className="text-link" onClick={openCookieSettings}>
                  Cookie settings
                </button>{' '}
                link in the footer of every page. If you withdraw consent, we stop setting analytics cookies from that
                point.
              </>
            ),
          },
          {
            p: 'You can also block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the website from working as expected.',
          },
        ],
      },
      {
        title: 'Changes to this policy',
        blocks: [
          {
            p: 'We will update this policy if we change the cookies we use. The date at the top shows when it last changed.',
          },
        ],
      },
      {
        title: 'Contact us',
        blocks: [
          {
            p: (
              <>
                Questions about cookies? Email <Mail />.
              </>
            ),
          },
        ],
      },
    ],
  },
}

function renderBlock(b: Block, k: number) {
  if ('p' in b) return <p key={k}>{b.p}</p>
  if ('list' in b)
    return (
      <ul key={k} className="legal-list">
        {b.list.map((item, n) => (
          <li key={n}>{item}</li>
        ))}
      </ul>
    )
  return (
    <div key={k} className="legal-table" role="region" aria-label="Table" tabIndex={0}>
      <table>
        <thead>
          <tr>
            {b.table.head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.table.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LegalPage({ kind }: Props) {
  const c = COPY[kind]
  usePageMotion(`${c.title} · Liftr`)
  return (
    <article className="legal">
      <p className="eyebrow">Legal</p>
      <h1>{c.title}</h1>
      <p className="legal-updated">Last updated: {c.updated}</p>
      <p className="legal-intro">{c.intro}</p>
      <ol className="legal-sections">
        {c.sections.map((s) => (
          <li key={s.title}>
            <h2>{s.title}</h2>
            {s.blocks.map(renderBlock)}
          </li>
        ))}
      </ol>
      <p className="legal-company">Liftr Limited · Company number 14052657 · 71 to 75 Shelton Street, London, WC2H 9JQ</p>
    </article>
  )
}
