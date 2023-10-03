class CategoryMapper {
  toDomain(persistenceCotegory) {
    return {
      id: persistenceCotegory.id,
      name: persistenceCotegory.name,
    };
  }
}

export default new CategoryMapper();
