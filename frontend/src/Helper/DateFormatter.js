export default function formatDate(dateString) {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  const diffInMilliseconds = currentDate - targetDate;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const formattedDate = `${
    monthNames[targetDate.getMonth()]
  } ${targetDate.getDate()}`;

  if (diffInDays === 1) {
    return `${formattedDate} (1 day ago)`;
  } else if (diffInDays > 1) {
    return `${formattedDate} (${diffInDays} days ago)`;
  } else {
    return formattedDate;
  }
}
