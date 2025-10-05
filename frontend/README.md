_Thanks for your consideration of my application!_

# Setup
1. Clone the repository
2. Install the dependencies inside the repository (`npm install`)
3. Start the project (`npm run dev`)

# Decisions, Approach, Priorities, and Results
My approach started with documenting the annotations in the design specification, and I assigned priorities to them given the time constraint of the assignment (for example, animations/transitions and the cursor tooltip were low-priority based on their effort to implement, relative to core functionality).

I then went through the design and matched UI elements to API fields, and understood which data I needed to bring in based on the API documentation.

I started by fetching the properties and assigning a default property (the first of the array) to test other components, so I de-prioritized the dropdown for that moment as I pursued core implementation first.

As I went about implementing API fetches, my flow started to get interrupted by issues related to component re-rendering (re-fetching information) and some of the logic related to UI elements like finding the next insurance renewal (which I deduced to be down to writing logic that would find the first `renewal_n_date` after the current date). These issues slowed down my progress, and I figured that I'd have to course correct to complete my assignment in time.

Therefore, rather than continue wrestling the fetching and not making progress elsewhere, I decided to move on to implementing static components with proper styling. This step came together much quicker, and I achieved the core layout of the dashboard relatively swiftly. My decision for this was that with more time, ironing out the data fetching would result in a quick process of substituting static data with fetched values.

# What I would have done with more time
- Data fetching: Since this was the greatest impediment in completing the assignment in time and thus led me to re-prioritize, I would connect the UI elements to their data sources. for example:
  - **Progress bar of Premium Lock Reimbursement:** Calculate `(premium_prediction / 100) * reimbursement_to_date` to get progress
  - **Bar heights for Insurance Tracker:** Calculate the largest premium, then calculate what each other premium `year_n_premium` would be proportional to the max to render the approproate bar height as a %

- More detailed animations and interactions such as:
  - **Bar tooltip:** Would have to calculate the mouse position relative to the bar, and render a tooltip element relative to that calculated position
  -  **Bar fill animation:** Would apply an animation/transition delay relative to `n` for each `nth` bar, and its width would animate/transition from `0` to its calculated relative height (see **Bar heights for insurance tracker** above)

- Typing: Applied interfaces and type declarations as necessary

- Tokenization of styles: Map styles to tokens for reusability and code clarity

---

_I look forward to discussing more!_