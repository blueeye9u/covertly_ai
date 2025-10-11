import { Random_Names } from '../constants/random-names';

export const getRandomName = (animals = Random_Names) => {
    // Split each animal into start and end parts
    const animalParts = animals.map(animal => ({
      start: animal.split(' ')[0],
      end: animal.split(' ')[1]
    }));
  
    // Randomly select a start and end part
    const randomStart = animalParts[Math.floor(Math.random() * animalParts.length)].start;
    const randomEnd = animalParts[Math.floor(Math.random() * animalParts.length)].end;
  
    // Combine the random parts to form a new animal name
    return randomStart + ' ' + randomEnd;
  }

  export const getFullName = (name: string) => {
    if(name =="") return "";
    return name?.trim()?.split("_")?.join(" ");
  }