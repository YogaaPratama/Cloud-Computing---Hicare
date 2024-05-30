async function postPredictHandler(request, h){
    const { image } = request.payload;

    const data ={
        id: id,
        result: label,
    }

    const response = h.response({
        status: "Success",
        message : "Media berhasil dideteksi",
        data,
    });
    response.code(201);
    return response;
}

module.exports = {postPredictHandler}