defmodule DefGuardTest do
  use ExUnit.Case

  doctest DefGuard

  describe "help" do
    test "When given args is [\"-h\"], it should returns true" do
      assert DefGuard.help(["-h"])
    end

    test "When given args is [\"--help\"], it should returns true" do
      assert DefGuard.help(["--help"])
    end

    test "When given args is not help, it should returns true" do
      refute DefGuard.help(["-d"])
    end
  end
end
