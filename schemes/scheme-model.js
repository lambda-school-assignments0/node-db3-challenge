const db = require("../data/db-config.js");

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
        .where({ id })
        .first();
}

function findSteps(id) {
    return db
        .select(
            "steps.id",
            "schemes.scheme_name",
            "steps.step_number",
            "steps.instructions"
        )
        .from("steps")
        .innerJoin("schemes", "steps.scheme_id", "=", "schemes.id")
        .where("steps.scheme_id", "=", id);
}

async function add(scheme) {
    const [id] = await db("schemes").insert(scheme);
    return findById(id);
}

async function update(changes, id) {
    await db("schemes")
        .update(changes)
        .where({ id });

    return findById(id);
}

function remove(id) {
    return db("schemes")
        .where({ id })
        .del();
}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};
