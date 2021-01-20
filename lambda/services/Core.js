const moment = require("moment");

module.exports = {
  compareDates: (body, meeting) => {
    const currentDate = moment(meeting.start_time);
    const newDate = moment(body.date);
    return !currentDate.isSame(newDate);
  },
  comparePrices: (body, prices) => {},
};
