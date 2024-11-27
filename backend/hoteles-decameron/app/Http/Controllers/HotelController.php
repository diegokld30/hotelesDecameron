<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotel;
use Exception;
use Illuminate\Support\Facades\Storage;


class HotelController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/hoteles",
     *      operationId="getHoteles",
     *      tags={"Hoteles"},
     *      summary="Obtener la lista de hoteles",
     *      description="Retorna una lista con todos los hoteles registrados",
     *      @OA\Response(
     *          response=200,
     *          description="Lista obtenida con éxito"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor"
     *      )
     * )
     */
    public function index()
    {
        try {
            return response()->json(Hotel::all());
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al obtener los hoteles', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Post(
     *      path="/api/hoteles",
     *      operationId="createHotel",
     *      tags={"Hoteles"},
     *      summary="Crear un nuevo hotel",
     *      description="Crea un nuevo hotel con los datos proporcionados",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              required={"nombre", "nit", "numero_habitaciones", "direccion", "ciudad"},
     *              @OA\Property(property="nombre", type="string", example="Hotel Decameron"),
     *              @OA\Property(property="nit", type="string", example="123456789"),
     *              @OA\Property(property="numero_habitaciones", type="integer", example=100),
     *              @OA\Property(property="direccion", type="string", example="Calle 123, Ciudad"),
     *              @OA\Property(property="ciudad", type="string", example="Ciudad Ejemplo"),
     *              @OA\Property(property="imagen", type="string", format="binary")
     *          )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Hotel creado exitosamente"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor"
     *      )
     * )
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'required|unique:hoteles',
                'nit' => 'required|unique:hoteles',
                'numero_habitaciones' => 'required|integer',
                'direccion' => 'required',
                'ciudad' => 'required',
                'imagen' => 'nullable|image|max:2048',
            ]);

            $data = $request->all();

            if ($request->hasFile('imagen')) {
                $path = $request->file('imagen')->store('hoteles', 'public');
                $data['imagen'] = $path;
            }

            $hotel = Hotel::create($data);
            return response()->json($hotel, 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al crear el hotel', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/hoteles/{id}",
     *      operationId="getHotelById",
     *      tags={"Hoteles"},
     *      summary="Obtener un hotel específico",
     *      description="Retorna los detalles de un hotel basado en su ID",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID del hotel",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Detalles del hotel obtenidos con éxito"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Hotel no encontrado"
     *      )
     * )
     */
    public function show(string $id)
    {
        try {
            $hotel = Hotel::findOrFail($id);
            return response()->json($hotel);
        } catch (Exception $e) {
            return response()->json(['error' => 'Hotel no encontrado', 'message' => $e->getMessage()], 404);
        }
    }

    /**
     * @OA\Put(
     *      path="/api/hoteles/{id}",
     *      operationId="updateHotel",
     *      tags={"Hoteles"},
     *      summary="Actualizar un hotel",
     *      description="Actualiza los datos de un hotel existente",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID del hotel",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=false,
     *          @OA\JsonContent(
     *              @OA\Property(property="nombre", type="string"),
     *              @OA\Property(property="nit", type="string"),
     *              @OA\Property(property="imagen", type="string", format="binary")
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Hotel actualizado exitosamente"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error al actualizar el hotel"
     *      )
     * )
     */
    public function update(Request $request, string $id)
    {
        try {
            $hotel = Hotel::findOrFail($id);

            $request->validate([
                'nombre' => 'sometimes|unique:hoteles,nombre,' . $hotel->id,
                'nit' => 'sometimes|unique:hoteles,nit,' . $hotel->id,
                'imagen' => 'nullable|image|max:2048',
            ]);

            $data = $request->all();

            if ($request->hasFile('imagen')) {
                if ($hotel->imagen) {
                    Storage::disk('public')->delete($hotel->imagen);
                }

                $path = $request->file('imagen')->store('hoteles', 'public');
                $data['imagen'] = $path;
            } else {
                $data['imagen'] = $hotel->imagen;
            }

            $hotel->update($data);

            return response()->json($hotel);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al actualizar el hotel', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Delete(
     *      path="/api/hoteles/{id}",
     *      operationId="deleteHotel",
     *      tags={"Hoteles"},
     *      summary="Eliminar un hotel",
     *      description="Elimina un hotel existente",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID del hotel",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Hotel eliminado con éxito"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error al eliminar el hotel"
     *      )
     * )
     */
    public function destroy(string $id)
    {
        try {
            Hotel::destroy($id);
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al eliminar el hotel', 'message' => $e->getMessage()], 500);
        }
    }
}
