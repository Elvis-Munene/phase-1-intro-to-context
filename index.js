// Your code here

const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
       firstName,
       familyName,
       title,
       payPerHour,
       timeInEvents : [],
       timeOutEvents : []
   }
}


function createEmployeeRecords(records) {
    const employeeRecords = []
    records.forEach(record => {
        const emploee = createEmployeeRecord(record)
        employeeRecords.push(emploee)
    });
    return employeeRecords;
}

const createTimeInEvent = (record, timeStamp) => {

    const timeObject = {
    
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    
        record.timeInEvents.push(timeObject)
        return record
    }

    const createTimeOutEvent = (record, timeStamp) =>{ 

        const timeObject = {
            type: "TimeOut",
            date: timeStamp.split(" ")[0],
            hour: parseInt(timeStamp.slice(-4), 10)
        }
            record.timeOutEvents.push(timeObject)
            return record
        }
        function hoursWorkedOnDate(emploeeRecord, dateString) {
            const inObj = emploeeRecord.timeInEvents.find(element => element.date === dateString)
            const outObj = emploeeRecord.timeOutEvents.find(element => element.date === dateString)
            return (outObj.hour - inObj.hour) / 100
        }
        
        function wagesEarnedOnDate(emploeeRecord, dateString) {
            const inObj = emploeeRecord.timeInEvents.find(element => element.date === dateString)
            const outObj = emploeeRecord.timeOutEvents.find(element => element.date === dateString)
            return (outObj.hour - inObj.hour) / 100 * emploeeRecord.payPerHour
        }
        
        function allWagesFor(emploeeRecord){
            const totalDays = emploeeRecord.timeInEvents.length
            let sum = 0
            for (let i = 0; i < totalDays; i++ ){
              const totalHours = (emploeeRecord.timeOutEvents[i].hour - emploeeRecord.timeInEvents[i].hour)/100
              sum = sum + (totalHours) * emploeeRecord.payPerHour
            }
          return sum
        }
        
        function calculatePayroll(emploeeRecordArr){
            let sum = 0
            for (let i = 0; i < emploeeRecordArr.length; i++){
              sum = sum + allWagesFor(emploeeRecordArr[i])
            }
            return sum 
          }