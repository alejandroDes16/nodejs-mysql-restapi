import { pool } from "../db.js";

// Retornar todos los empleados
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    res.status(500).json("Algo fué mal");
    console.error(error);
  }
};

// Retornar un único empleado pasando su id como parámetro
export const getEmployee = async (req, res) => {
  try {
    // Realiza query con el parámetro del id indicado en la uri
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    console.log(rows);
    // Valida si ha encontrado un registro en la query, sino envía un mensaje 404.
    if (rows.length <= 0)
      return res.status(404).json({ message: "Employee not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
    console.error(error);
  }
};

// Crear empleado en db
export const createEmployee = async (req, res) => {
  // Extrae del request body las dos variables enviadas desde front
  const { name, salary } = req.body;
  try {
    // Ejecuta la query asincrona con las variables recibidas
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?,?)",
      [name, salary]
    );
    // Envía respuesta con el resultado de la insercción
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
    console.error(error);
  }
};

// Eliminar empleado pasando su id como parámetro
export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Employee not found" });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
    console.error(error);
  }
};

export const updateEmployee = async (req, res) => {
  // Del params, obtenemos el id del usuario a actualizar
  const { id } = req.params;
  // Del body, obtenemos los parámetros para actualizar
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ? ",
      [name, salary, id]
    );

    console.log(result);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
    console.error(error);
  }
};
