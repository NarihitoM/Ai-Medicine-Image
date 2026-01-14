export interface list {
   title : string,
   description : string,
   treatment : string,
   sideeffect : [string],
   recommendation : string 
}

export interface diagnoselist {
   title : string,
   description : string,
   treatment : string,
   sideeffect : [string],
   recommendation : string,
   checkup : boolean | null
}