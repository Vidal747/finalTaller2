// Sources
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Entity
    const eEntity = await prisma.entity.upsert({
        where: { name: 'Entity' },
        update: {},
        create: {
            name: 'Entity',
        },
    });
    const eRole = await prisma.entity.upsert({
        where: { name: 'Role' },
        update: {},
        create: {
            name: 'Role',
        },
    });
    const ePermission = await prisma.entity.upsert({
        where: { name: 'Permission' },
        update: {},
        create: {
            name: 'Permission',
        },
    });
    const eUser = await prisma.entity.upsert({
        where: { name: 'User' },
        update: {},
        create: {
            name: 'User',
        },
    });
    const eLog = await prisma.entity.upsert({
        where: { name: 'Log' },
        update: {},
        create: {
            name: 'Log',
        },
    });
    const eProduct = await prisma.entity.upsert({
        where: { name: 'Product' },
        update: {},
        create: {
            name: 'Product',
        },
    });
    const eImagesByProduct = await prisma.entity.upsert({
        where: { name: 'ImagesByProduct' },
        update: {},
        create: {
            name: 'ImagesByProduct',
        },
    });
    const eFrequentQuestion = await prisma.entity.upsert({
        where: { name: 'FrequentQuestion' },
        update: {},
        create: {
            name: 'FrequentQuestion',
        },
    });
    const eArticle = await prisma.entity.upsert({
        where: { name: 'Article' },
        update: {},
        create: {
            name: 'Article',
        },
    });

    // Role
    const rAdmin = await prisma.role.upsert({
        where: { name: 'Administrador' },
        update: {},
        create: {
            name: 'Administrador',
            description: 'Administrador del sistema',
            permissions: {
                createMany: {
                    data: [
                        {
                            entityId: eEntity.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: eRole.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: ePermission.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: eUser.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: eLog.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: eProduct.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: eImagesByProduct.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: eFrequentQuestion.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                        {
                            entityId: eArticle.id,
                            canCreate: true,
                            canRead: true,
                            canUpdate: true,
                            canDelete: true,
                        },
                    ],
                },
            },
        },
    });

    // User
    const hashedPassword2 = await hash('Market Poli.12345', 10);

    await prisma.user.upsert({
        where: { user: 'Admin' },
        update: {},
        create: {
            roleId: rAdmin.id,
            name: 'Administración Market Poli',
            phone: '0000000000',
            email: 'marketpoli@gmail.com',
            imageUrl: 'https://api.dicebear.com/7.x/bottts/svg',
            user: 'Admin',
            password: hashedPassword2,
            active: true,
        },
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
})