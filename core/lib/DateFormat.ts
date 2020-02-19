import moment from "moment";

type DateTypes = "DD/MM/YYYY" | "Month DD YYYY" | "Month DD YYYY HH:MM TT" | "DDD, MM, DD YYYY HH:MM TT" | "Day, MM, DD YYYY HH:MM TT" | "YYYY-MM-DD" | "YYYY/MM/DD HH:MM"
export default class FormatDate{

    static format(type: DateTypes, date:Date): string{
        if(type == "DD/MM/YYYY") return moment(date).format('L')
        else if(type == "Month DD YYYY") return moment(date).format('LL')
        else if(type == "Month DD YYYY HH:MM TT") return moment(date).format('LLL')
        else if(type == "DDD, MM, DD YYYY HH:MM TT") return moment(date).format('llll')
        else if(type == "Day, MM, DD YYYY HH:MM TT") return moment(date).format('LLLL')
        else if(type == "YYYY-MM-DD") return moment(date).format('YYYY-MM-DD')
        else if(type == "YYYY/MM/DD HH:MM") return moment(date).format('YYYY/MM/DD HH:MM');
        else return "Invalid Date"
    }
}