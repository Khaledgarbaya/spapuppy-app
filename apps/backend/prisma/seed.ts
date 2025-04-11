import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const breeds = [
  'Golden Retriever',
  'Labrador',
  'Poodle',
  'German Shepherd',
  'Bulldog',
  'Beagle',
  'Pug',
  'Shih Tzu',
  'Yorkshire Terrier',
  'Dachshund',
];

const services = [
  'Grooming',
  'Bath',
  'Full Service',
  'Nail Trim',
  'Ear Cleaning',
  'Teeth Brushing',
];

const firstNames = [
  'Max',
  'Bella',
  'Charlie',
  'Lucy',
  'Cooper',
  'Luna',
  'Buddy',
  'Daisy',
  'Rocky',
  'Molly',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generatePhoneNumber(): string {
  return `(${Math.floor(Math.random() * 900) + 100})-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

function generateTime(hour: number): string {
  const minutes = Math.floor(Math.random() * 12) * 5; // Random minutes in 5-minute intervals
  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

async function main() {
  // Generate data for the past 2 weeks
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    // Create waiting list for the day
    const waitingList = await prisma.waitingList.upsert({
      where: { date },
      update: {},
      create: { date },
    });

    // Generate random number of puppies for the day (between 3 and 8)
    const numPuppies = Math.floor(Math.random() * 6) + 3;
    const puppies = [];

    for (let j = 0; j < numPuppies; j++) {
      const arrivalHour = Math.floor(Math.random() * 6) + 8; // Between 8 AM and 2 PM
      const arrivalTime = generateTime(arrivalHour);
      const serviceStartTime = generateTime(arrivalHour + 1);
      const serviceEndTime = generateTime(arrivalHour + 2);

      const status = getRandomItem(['waiting', 'in_progress', 'completed']);
      
      puppies.push({
        name: getRandomItem(firstNames),
        breed: getRandomItem(breeds),
        ownerName: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        ownerPhone: generatePhoneNumber(),
        service: getRandomItem(services),
        notes: Math.random() > 0.7 ? 'Special instructions: ' + getRandomItem(['Sensitive skin', 'First time visit', 'Likes warm water', 'Needs extra attention']) : null,
        status,
        arrivalTime,
        serviceStartTime: status !== 'waiting' ? serviceStartTime : null,
        serviceEndTime: status === 'completed' ? serviceEndTime : null,
        position: j + 1,
        waitingListId: waitingList.id,
      });
    }

    // Create puppies for the day
    for (const puppy of puppies) {
      await prisma.puppy.create({
        data: puppy,
      });
    }

    console.log(`Created ${numPuppies} puppies for ${date.toISOString().split('T')[0]}`);
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
