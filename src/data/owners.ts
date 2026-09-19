export interface Owner {
  id: number
  name: string
  image: string
}

const owners: Array<Owner> = [
  { id: 1, name: 'Bañez, Lean', image: '/img/owners/banez-lean.jpg' },
  { id: 2, name: 'Panoncillo, Shiela Mae', image: '/img/owners/panoncillo-shielamae.jpg' },
  { id: 3, name: 'Tayong, Arriane', image: '/img/owners/tayong-arriane.jpg' },
  { id: 4, name: 'Ubay, Melrose', image: '/img/owners/ubay-melrose.jpg' },
  { id: 5, name: 'Uy, Kyle Eric', image: '/img/owners/uy-kyleeric.jpg' },
]

export default owners
