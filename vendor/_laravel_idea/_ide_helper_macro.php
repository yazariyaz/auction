<?php
/** @noinspection PhpUndefinedClassInspection */
/** @noinspection PhpFullyQualifiedNameUsageInspection */

namespace Illuminate\Foundation\Testing {

    /**
     * @method array inertiaPage()
     * @method $this assertInertia(\Closure $callback = null)
     */
    class TestResponse {}
}

namespace Illuminate\Http {

    /**
     * @method array validate(array $rules, ...$params)
     * @method array validateWithBag(string $errorBag, array $rules, ...$params)
     * @method bool hasValidSignature($absolute = true)
     * @method bool hasValidRelativeSignature()
     * @method bool hasValidSignatureWhileIgnoring($ignoreQuery = [], $absolute = true)
     * @method bool inertia()
     */
    class Request {}
}

namespace Illuminate\Routing {

    /**
     * @method Route inertia($uri, $component, $props = [])
     */
    class Router {}
}

namespace Illuminate\Testing {

    /**
     * @method array inertiaPage()
     * @method $this assertInertia(\Closure $callback = null)
     */
    class TestResponse {}
}
