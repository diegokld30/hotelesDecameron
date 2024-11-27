<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Documentación de API de Gestión Hotelera",
 *      description="API para gestionar hoteles y habitaciones",
 *      @OA\Contact(
 *          email="diegokld23@gmail.com.com"
 *      ),
 *      @OA\License(
 *          name="MIT",
 *          url="https://opensource.org/licenses/MIT"
 *      )
 * )
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
