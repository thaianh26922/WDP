import { Company } from "../Model/Company.js";

async function updateCompany(companyId, status) {
    const company = await Company.findOneAndUpdate({_id: companyId}, {vip: status}, {new: true}).exec();
    return company;
}

export default {updateCompany}