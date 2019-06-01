export class Pos{
  lat: number
  lng: number
}
export class Track {
  position: Array<Pos>
  tempo : {
    ora_Sblocco : Date
    ora_Blocco : Date
  }
}
