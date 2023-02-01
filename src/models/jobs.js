//dữ liệu mặt hàng
class Jobs {
   constructor(id, company, title, imageUrl, description, requirement, language, time, type, salary, req_eng, req_gen, contact, location, city,comid) {
      this.id = id;
      this.company = company;
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.requirement = requirement;
      this.language = language;
      this.time = time;
      this.type = type;
      this.salary = salary;
      this.req_eng = req_eng;
      this.req_gen = req_gen;
      this.contact = contact;
      this.location = location;
      this.city = city;
      this.comid = comid;
   }
}

export default Jobs;