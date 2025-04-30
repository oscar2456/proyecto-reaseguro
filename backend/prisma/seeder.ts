import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
    // Seed data for OscarBarriosContrato model
    const contratos = [
        {
            nombre: 'Contrato A',
            montoPrima: 1000.50,
        },
        {
            nombre: 'Contrato B',
            montoPrima: 2000.75,
        },
        {
            nombre: 'Contrato C',
            montoPrima: 1500.25,
        },
    ];

    for (const contrato of contratos) {
        await prisma.oscarBarriosContrato.create({
            data: contrato,
        });
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });