const pool = require('../database/db');

const getRabbanaDuas = async (req, res) => {
   


    pool.query('SELECT * FROM rabbana_duas',
        (error, results) => {
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
    getRabbanaDuas
}