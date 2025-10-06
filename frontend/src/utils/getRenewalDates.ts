export const getRenewalDates = (data) => {
  let dates = [];
  if(data?.renewal_1_date) dates.push(data.renewal_1_date);
  if(data?.renewal_2_date) dates.push(data.renewal_2_date);
  if(data?.renewal_3_date) dates.push(data.renewal_3_date);
  return dates;
}