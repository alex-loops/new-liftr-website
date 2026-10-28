import type { SVGProps } from 'react'
import { LiftrMark } from './Icons'

/** Pippa Labs "on-pippa" symbol (from the Pippa design system; used with permission). */
export const PippaMark = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 348.98776 345.18619" fill="currentColor" stroke="currentColor" strokeMiterlimit={10} aria-hidden {...p}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M122.31123,67.93764C63.59677,90.71673,42.36337,163.09633,85.9956,210.745c45.37667,46.84534,90.11434,14.44591,116.0335,34.97952c12.67348,11.90863,10.40016,30.93875,10.72585,46.84296c-0.02753,8.67126,0.88892,17.91104-2.21271,26.22424c-3.62396,10.62354-16.31282,14.90414-26.63702,12.15973c-7.64322-1.88788-14.74818-9.33191-17.02274-17.22107c-1.51633-4.99844-1.37239-10.81302-2.06502-16.14981c-0.59219-13.44031-12.62834-11.09296-22.11896-11.77396c-40.6604-1.61273-79.99915-22.22079-103.46796-55.55463C-26.488,140.02095,41.87937,22.05704,147.96271,13.53838"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M70.65509,114.19234c29.31187-56.9673,104.91556-70.11284,147.17517-19.5923c15.25728,18.58832,22.26196,43.54348,18.90611,67.28794c-0.56535,15.43758-6.19836,32.11797-0.51028,47.175c9.79976,20.51083,36.29198,18.23833,55.46663,21.19281c11.48654,0.97418,24.96429,4.86412,35.29974-2.19141c8.91312-6.50134,11.03943-20.44505,5.5983-29.75742c-4.32281-7.50308-12.33871-13.46039-21.11401-14.23915c-19.62671-0.69347-28.73724-7.51044-26.2963-28.10054c2.49078-40.34889-14.02423-80.99265-44.21573-107.8239C157.89015-27.5412,34.73326,29.3033,14.89413,134.08011"
    />
  </svg>
)

/** Liftr star and Pippa Labs symbol side by side (case study hero). */
export function PartnerMarks() {
  return (
    <div className="partner-marks" role="img" aria-label="Liftr and Pippa Labs">
      <span className="partner-mark is-liftr">
        <LiftrMark />
      </span>
      <span className="partner-plus" aria-hidden>
        +
      </span>
      <span className="partner-mark is-pippa">
        <PippaMark />
      </span>
    </div>
  )
}
