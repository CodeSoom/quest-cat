defmodule CatTest do
  use ExUnit.Case
  doctest Cat

  test "greets the world" do
    assert Cat.hello() == :world
  end
end
