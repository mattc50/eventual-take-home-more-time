# Where I left off with the assignment
First, I want to highlight what was already in my mind after completing the 2-hour assignment, and what I knew I wanted to do with more time. My intent is to do all of this top-of-mind and be able to explain decisions, but will indicate when further investigation is done.
- **Data fetching:** Resolve the issues I was facing with data fetching, and be able to render actual data in the app.
- **Implement the Premium Lock Reimbursement bar:** The bar progress is `(progress / total) * 100`, so this needs to come from the actual data.
- **Implement the Insurance Tracker chart:** Add the onload animation and the prediction line at the correct place in the chart.
  - The bars would be calculated based on their _proportion to the element height (300px)._ Additionally, the premium year with the highest value would effectively be set as "100%" height.
  - The prediction line would be absolutely positioned relative to the chart, and would have a bottom displacement of `(prediction / highest year premium) * 100`. It would also have `transform: translateY(-50%)` to align the middle of the line with the exact position it's supposed to demarcate. The prediction value would also be absolutely positioned relative to the line, and displaced with `transform: translateY(-50%)` to appear in the vertical center. Last, I would apply what I believe is a `color-blend-mode: multiply` to allow it to appear darker green over the green hover, but still green over the white.
- **Find the Aeonik font:** I added it in my styling but wasn't seeing it be rendered.

# Further Explorations
I anticipate needing to do a deeper dive into the following, but will share my top-of-mind thoughts on what they'd entail.
- Add the backend: I don't want to keep polling Eventual's Heroku backend instance, so I will create a local version of my own and provide setup instructions.
- Cursor-following tooltip: I'd get the cursor's relative position to the bar, and then display the tooltip info over that determined point.
- Number animation: It might be something to do with:
  1. Figure out how many digits need to be rendered.
  2. Have a component which stacks 0 to 9 vertically, and render this for how many digits there are. This component should also take in a `max` (the digit in that spot) to know where to anchor to in the animation.
  3. As the numbers are changing, blur the component.
  4. Add a slight bounce to resolve the animation (I have done this before with a `bezier` in a previous project), but will need to re-assess that to see what specifically leads to the "bounce".

  # Timeline
  My goal is to have this done in a few hours **on Sunday, October 5** (the day after my birthday!).