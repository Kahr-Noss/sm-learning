import { CustomOperation } from './custom-number.types'

export type BigNumber = number[]

const fromString = (s: string): BigNumber => {
  // check if the string is a number
  if (!/^[0-9]*$/.test(s)) {
    throw new Error('Not a number')
  }
  return s.split('').reverse().map((n: string): number => Number(n))
}
const toString = (n: BigNumber): string => [...n].reverse().join('')

const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  let index: number = 0
  const output: BigNumber = []
  let retenue: boolean = false
  // continue tant qu'il y a des chiffres dans les nombres ou une retenue
  while (index < n1.length || index < n2.length || retenue) {
    // ajoute les 2 nombres;
    const sum: number = (n1[index] || 0) + (n2[index] || 0) + (retenue ? 1 : 0)
    // ajoute les unités de la somme
    output.push(sum % 10)
    retenue = sum >= 10
    index++
  }
  return output
}

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {
  let output: BigNumber = [0]
  for (let i:number = 0; i < n1.length; i++) {
    // on divise n1 en unité, dizaines, centaines...
    // on commence le nombre à la puissance de 10 correspondante
    const produitIntermédiare: BigNumber = Array(i).fill(0)
    // et on multiplie n2 par le chiffre pour faire le produit intermédiaire
    let retenue: number = 0
    for (let j:number = 0; j < n2.length; j++) {
      const product = (n1[i] * n2[j]) + retenue
      // on ajoute l'unité
      produitIntermédiare.push(product % 10)
      // on retient les dizaines
      retenue = (product - (product % 10)) / 10
    }
    // s'il reste une retenue à la fin, on l'ajoute
    if (retenue) {
      produitIntermédiare.push(retenue)
    }
    // on additionne le produit intermédiare à la somme totale
    output = add(output, produitIntermédiare)
  }
  return output
}

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
