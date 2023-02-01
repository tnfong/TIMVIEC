import moment from 'moment';

class AppliedJobs {
   constructor(id, jobid, date, title, imageUrl, time, salary) {
      this.id = id;
      this.jobid = jobid;
      this.date = date;
      this.title = title;
      this.imageUrl = imageUrl;
      this.time = time;
      this.salary = salary;
   }

   get readableDate() {
      return moment(this.date).format("MMMM Do YYYY");
   }
}

export default AppliedJobs;