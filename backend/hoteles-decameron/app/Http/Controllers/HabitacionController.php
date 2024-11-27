<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Habitacion;
use App\Models\Hotel;
use Exception;
use Illuminate\Support\Facades\DB;

class HabitacionController extends Controller
{
    /**
     * @OA\Get(
     *      path="/api/habitaciones",
     *      operationId="getHabitaciones",
     *      tags={"Habitaciones"},
     *      summary="Obtener todas las habitaciones",
     *      description="Retorna una lista de todas las habitaciones registradas",
     *      @OA\Response(
     *          response=200,
     *          description="Lista de habitaciones obtenida con éxito"
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
            $habitaciones = Habitacion::with('hotel')->get();
            return response()->json($habitaciones, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Error al obtener las habitaciones', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/api/habitaciones/{id}",
     *      operationId="getHabitacionById",
     *      tags={"Habitaciones"},
     *      summary="Obtener una habitación específica",
     *      description="Retorna los detalles de una habitación basada en su ID",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID de la habitación",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Detalles de la habitación obtenidos con éxito"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Habitación no encontrada"
     *      )
     * )
     */
    public function show($id)
    {
        try {
            $habitacion = Habitacion::with('hotel')->findOrFail($id);
            return response()->json($habitacion, 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Habitación no encontrada', 'message' => $e->getMessage()], 404);
        }
    }

    /**
     * @OA\Post(
     *      path="/api/habitaciones",
     *      operationId="createHabitacion",
     *      tags={"Habitaciones"},
     *      summary="Crear una nueva habitación",
     *      description="Crea una nueva habitación asociada a un hotel",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              required={"hotel_id", "tipo", "acomodacion", "cantidad"},
     *              @OA\Property(property="hotel_id", type="integer", example=1),
     *              @OA\Property(property="tipo", type="string", enum={"ESTANDAR", "JUNIOR", "SUITE"}, example="ESTANDAR"),
     *              @OA\Property(property="acomodacion", type="string", enum={"SENCILLA", "DOBLE", "TRIPLE", "CUADRUPLE"}, example="DOBLE"),
     *              @OA\Property(property="cantidad", type="integer", example=5)
     *          )
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Habitación creada con éxito"
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Datos inválidos"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor"
     *      )
     * )
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'hotel_id' => 'required|exists:hoteles,id',
                'tipo' => 'required|in:ESTANDAR,JUNIOR,SUITE',
                'acomodacion' => 'required|in:SENCILLA,DOBLE,TRIPLE,CUADRUPLE',
                'cantidad' => 'required|integer',
            ]);

            $existingRoom = Habitacion::where('hotel_id', $request->hotel_id)
                ->where('tipo', $request->tipo)
                ->where('acomodacion', $request->acomodacion)
                ->first();
            if ($existingRoom) {
                return response()->json(['error' => 'Ya existe una habitación con ese tipo y acomodación para este hotel'], 400);
            }

            $hotel = Hotel::findOrFail($request->hotel_id);

            if (($request->tipo == 'ESTANDAR' && !in_array($request->acomodacion, ['SENCILLA', 'DOBLE'])) ||
                ($request->tipo == 'JUNIOR' && !in_array($request->acomodacion, ['TRIPLE', 'CUADRUPLE'])) ||
                ($request->tipo == 'SUITE' && !in_array($request->acomodacion, ['SENCILLA', 'DOBLE', 'TRIPLE']))) {
                return response()->json(['error' => 'Acomodación no permitida para el tipo de habitación'], 400);
            }

            if ($hotel->habitaciones->sum('cantidad') + $request->cantidad > $hotel->numero_habitaciones) {
                return response()->json(['error' => 'Cantidad de habitaciones supera el máximo permitido por hotel'], 400);
            }

            $habitacion = Habitacion::create($request->all());

            DB::commit();
            return response()->json($habitacion, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al crear la habitación', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Put(
     *      path="/api/habitaciones/{id}",
     *      operationId="updateHabitacion",
     *      tags={"Habitaciones"},
     *      summary="Actualizar una habitación existente",
     *      description="Actualiza los detalles de una habitación",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID de la habitación",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
     *          required=false,
     *          @OA\JsonContent(
     *              @OA\Property(property="tipo", type="string", enum={"ESTANDAR", "JUNIOR", "SUITE"}),
     *              @OA\Property(property="acomodacion", type="string", enum={"SENCILLA", "DOBLE", "TRIPLE", "CUADRUPLE"}),
     *              @OA\Property(property="cantidad", type="integer")
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Habitación actualizada con éxito"
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Datos inválidos"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor"
     *      )
     * )
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $habitacion = Habitacion::findOrFail($id);

            $request->validate([
                'tipo' => 'sometimes|in:ESTANDAR,JUNIOR,SUITE',
                'acomodacion' => 'sometimes|in:SENCILLA,DOBLE,TRIPLE,CUADRUPLE',
                'cantidad' => 'sometimes|integer',
            ]);

            $data = $request->all();
            $habitacion->update($data);

            DB::commit();
            return response()->json($habitacion, 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al actualizar la habitación', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * @OA\Delete(
     *      path="/api/habitaciones/{id}",
     *      operationId="deleteHabitacion",
     *      tags={"Habitaciones"},
     *      summary="Eliminar una habitación",
     *      description="Elimina una habitación basada en su ID",
     *      @OA\Parameter(
     *          name="id",
     *          description="ID de la habitación",
     *          required=true,
     *          in="path",
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Habitación eliminada con éxito"
     *      ),
     *      @OA\Response(
     *          response=500,
     *          description="Error interno del servidor"
     *      )
     * )
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $habitacion = Habitacion::findOrFail($id);
            $habitacion->delete();

            DB::commit();
            return response()->json(null, 204);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al eliminar la habitación', 'message' => $e->getMessage()], 500);
        }
    }
}
