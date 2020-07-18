import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAlbumsTable1595021159445
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'albums',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cover',
            type: 'varchar',
          },
          {
            name: 'artist_id',
            type: 'uuid',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'session_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'albums_artist_id',
            columnNames: ['artist_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'artists',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'albums_category_id',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'albums_session_id',
            columnNames: ['session_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sessions',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('albums');
  }
}
