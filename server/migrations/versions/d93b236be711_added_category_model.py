"""added category model

Revision ID: d93b236be711
Revises: c995b52934e5
Create Date: 2023-06-15 11:12:04.300510

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd93b236be711'
down_revision = 'c995b52934e5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('icon', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('activities', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_activities_category_id_categories'), 'categories', ['category_id'], ['id'])
        batch_op.drop_column('category')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('activities', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.VARCHAR(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_activities_category_id_categories'), type_='foreignkey')
        batch_op.drop_column('category_id')

    op.drop_table('categories')
    # ### end Alembic commands ###