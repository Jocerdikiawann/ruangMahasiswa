module.exports = (sequelize, DataTypes) => {
  const refreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "createdAt",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updatedAt",
        allowNull: false,
      },
    },
    {
      tableName: "refresh_tokens",
      timestamps: true,
    }
  );
  return refreshToken;
};
