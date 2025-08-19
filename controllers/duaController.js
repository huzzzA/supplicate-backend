const pool = require('../database/db');

const getDuaCategories = async (req, res) => {


    pool.query('SELECT * FROM dua_categories ORDER BY id',
        (error, results) => {
            if (error) {
                console.error(error); // Log the error for debugging
                res.status(500).send('Error fetching data'); // Inform the client
                return;
            }

            res.status(200).json(results.rows)
        }
    );

};



const getDuaSubCategories = async (req, res) => {
    const { id } = req.query;

    pool.query('SELECT * FROM dua_subcategories WHERE category_id = $1 ORDER BY $1',
        [id], (error, results) => {
            if (error) {
                console.error(error); // Log the error for debugging
                res.status(500).send('Error fetching data'); // Inform the client
                return;
            }

            if (results.rows.length === 0) {
                return res.status(404).json({ message: 'No subcategory found for this category' });
            }

            res.status(200).json(results.rows)
        }
    );

};

const getDuas = async (req, res) => {
    const { subcategory_id } = req.query;


    pool.query('SELECT * FROM duas WHERE subcategory_id = $1',
        [subcategory_id], (error, results) => {
            if (error) {
                console.error(error); // Log the error for debugging
                res.status(500).send('Error fetching data'); // Inform the client
                return;
            }

            if (results.rows.length === 0) {
                return res.status(404).json({ message: 'No dua found for this category' });
            }

            res.status(200).json(results.rows)
        }
    );

};


module.exports = {
    getDuaCategories,
    getDuaSubCategories,
    getDuas
}