const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {

    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async show(request, response) {
    // Obter Um registro
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      // 404: Not Found

      return response.status(404).json({ error: 'User not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const nameExist = await CategoriesRepository.findByName(name);

    if (nameExist) {
      return response
        .status(400)
        .json({ error: 'This name is already in user' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      // 404: Not Found

      return response.status(404).json({ error: 'User not found' });
    }

    const nameExist = await CategoriesRepository.findByName(name);

    if (nameExist) {
      return response
        .status(400)
        .json({ error: 'This name is already in user' });
    }

    const category = await CategoriesRepository.update(id, name);

    response.json(category);

  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      // 404: Not Found

      return response.status(404).json({ error: 'User not found' });
    }

    await CategoriesRepository.delete(id);

    response.sendStatus(204);

  }
}

module.exports = new CategoryController();
