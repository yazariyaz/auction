<?php
/** @noinspection PhpUndefinedClassInspection */
/** @noinspection PhpFullyQualifiedNameUsageInspection */

namespace Illuminate\Foundation\Testing {

    /**
     * @method static array inertiaPage()
     * @method static $this assertInertia(\Closure $callback = null)
     */
    class TestResponse {}
}

namespace Illuminate\Http {

    /**
     * @method static array validate(array $rules, ...$params)
     * @method static array validateWithBag(string $errorBag, array $rules, ...$params)
     * @method static bool hasValidSignature($absolute = true)
     * @method static bool hasValidRelativeSignature()
     * @method static bool hasValidSignatureWhileIgnoring($ignoreQuery = [], $absolute = true)
     * @method static bool inertia()
     */
    class Request {}
}

namespace Illuminate\Routing {

    /**
     * @method static Route inertia($uri, $component, $props = [])
     */
    class Router {}
}

namespace Illuminate\Testing {

    /**
     * @method static array inertiaPage()
     * @method static $this assertInertia(\Closure $callback = null)
     */
    class TestResponse {}
}
